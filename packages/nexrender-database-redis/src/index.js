const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.getAsync = promisify(client.get).bind(client);
client.setAsync = promisify(client.set).bind(client);
client.delAsync = promisify(client.del).bind(client);
client.scanAsync = promisify(client.scan).bind(client);

/* internal methods */
const scan = async parser => {
    let cursor = '0';
    let results = [];

    const _scan = async () => {
        const [ next, keys ] = await client.scanAsync(cursor, 'MATCH', 'nexjob:*', 'COUNT', '10');

        cursor = next;
        results = results.concat(keys);

        if (cursor === '0') {
            results = await results.map(parser).filter(e => e !== null && e !== undefined);
            return results;
        } else {
            return _scan(parser);
        }
    }

    await _scan(parser);

    return Promise.all(results);
};

/* public api */
const insert = async entry => {
    const now = new Date();

    entry.updatedAt = now;
    entry.createdAt = now;

    // use await setNextJob(entry); to set TTL
    await setNextJob(entry);
};

const fetch = async uid => {
    if (uid) {
        const entry = await client.getAsync(`nexjob:${uid}`);
        return JSON.parse(entry);
    } else {
        return await scan(async (result) => {
            const value = await client.getAsync(result);
            return JSON.parse(value);
        });
    }
};

const update = async (uid, object) => {
    const now = new Date();
    let entry = await fetch(uid);

    entry = Object.assign(
        {}, entry, object,
        { updatedAt: now }
    );

    // use await setNextJob(entry); to set TTL
    await setNextJob(entry);
    return entry;
};

const remove = async uid => {
    await client.del(`nexjob:${uid}`);
    return true;
};

const cleanup = () => {
    return scan(async (result) => {
        return await client.del(result);
    });
};

// use this method to set TTL rather than client.setAsync
const setNextJob = async (entry) => {
    client.log(`nexrender-database-redis: setting TTL for ${entry.uid} to ${process.env.NEXRENDER_REDIS_TTL} seconds`);
    if (process.env.NEXRENDER_REDIS_TTL) {
        // the ex below configures the expiration TTL (Time to live) in Redis.
        // https://redis.io/commands/set
        // for our version of redis, it seems like we need to use the key 'ex' instead of 'EX'
        // and that the value should be an integer. The API for the old version isn't very clear.
        // https://github.com/redis/node-redis/blob/v3.1.2/test/commands/set.spec.js#L67
        // 60 * 60 * 24 = 1 day hardcoding for now to ensure that it works.
        let ttl = parseInt(process.env.NEXRENDER_REDIS_TTL);
        if (parseInt(ttl) > 0) {
            ttl = 60 * 60 * 24
        }
        await client.setAsync(`nexjob:${entry.uid}`, JSON.stringify(entry), 'ex', ttl);
    } else {
        await client.setAsync(`nexjob:${entry.uid}`, JSON.stringify(entry));
    }
}

module.exports = {
    insert,
    fetch,
    update,
    remove,
    cleanup,
}
