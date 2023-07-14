const { initTracer, init, render } = require('@nexrender/core')
const { createClient } = require('@nexrender/api')
const { getRenderingStatus } = require('@nexrender/types/job')

var rollbar = null;
if(process.env.ENABLE_ROLLBAR) {
    var Rollbar = require('rollbar');
    rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        code_version: '1.0.0',
        environment: process.env.ENVIRONMENT
      }
    });
}

const NEXRENDER_API_POLLING = process.env.NEXRENDER_API_POLLING || 30 * 1000;
const NEXRENDER_TOLERATE_EMPTY_QUEUES = process.env.NEXRENDER_TOLERATE_EMPTY_QUEUES;
var emptyReturns = 0;

/* TODO: possibly add support for graceful shutdown */
let active = true;

const delay = amount => (
    new Promise(resolve => setTimeout(resolve, amount))
)

const nextJob = async (client, settings) => {
    do {
        try {
            let job = await (settings.tagSelector ?
                await client.pickupJob(settings.tagSelector) :
                await client.pickupJob()
            );

            if (job && job.uid) {
                emptyReturns = 0;
                return job
            } else {
                // no job was returned by the server. If enough checks have passed, and the exit option is set, deactivate the worker
                emptyReturns++;
                if (settings.exitOnEmptyQueue && emptyReturns > settings.tolerateEmptyQueues) active = false;
            }

        } catch (err) {
            if (settings.stopOnError) {
                throw err;
            } else {
                settings.logger.error(err)
                settings.logger.error("render proccess stopped with error...")
                settings.logger.error("continue listening next job...")
            }
        }

        if (active) await delay(settings.polling || NEXRENDER_API_POLLING)
    } while (active)
}

const processJob = async (client, settings, job) => {
    try {
        await client.updateJob(job.uid, job)
    } catch(err) {
        settings.logger.log(`[${job.uid}] error while updating job state to ${job.state}. Job abandoned.`)
        settings.logger.log(`[${job.uid}] error stack: ${err.stack}`)
        return  "continue";
    }

    try {
        job.onRenderProgress = function (job, /* progress */) {
            try {
                /* send render progress to our server */
                client.updateJob(job.uid, getRenderingStatus(job))
            } catch (err) {
                if (settings.stopOnError) {
                    throw err;
                } else {
                    settings.logger.log(`[${job.uid}] error occurred: ${err.stack}`)
                    settings.logger.log(`[${job.uid}] render proccess stopped with error...`)
                    settings.logger.log(`[${job.uid}] continue listening next job...`)
                }
            }
        }

        job.onRenderError = (job, err /* on render error */) => {
            job.error = [].concat(job.error || [], [err.toString()]);
        }

        if (process.env.ENABLE_DATADOG_APM) {
            let wrappedRender = settings.tracer.wrap('render', render)
            job = await wrappedRender(job, settings); {
                job.state = 'finished';
                job.finishedAt = new Date()
            }
         }
         else {
            job = await render(job, settings); {
                job.state = 'finished';
                job.finishedAt = new Date()
            }
         }


        await client.updateJob(job.uid, getRenderingStatus(job))
    } catch (err) {
        job.error = [].concat(job.error || [], [err.toString()]);
        job.errorAt = new Date();
        job.state = 'error';

        await client.updateJob(job.uid, getRenderingStatus(job)).catch((err) => {
            if (settings.stopOnError) {
                throw err;
            } else {
                settings.logger.log(`[${job.uid}] error occurred: ${err.stack}`)
                settings.logger.log(`[${job.uid}] render proccess stopped with error...`)
                settings.logger.log(`[${job.uid}] continue listening next job...`)
            }
        });
        
        if (settings.stopOnError) {
            if (process.env.ENABLE_ROLLBAR) {
                const context = {
                    "job": job,
                    "settings": settings,
                }
                rollbar.error(err, context);
            }
            else {
                throw err;
            }
        } else {
            settings.logger.log(`[${job.uid}] error occurred: ${err.stack}`)
            settings.logger.log(`[${job.uid}] render proccess stopped with error...`)
            settings.logger.log(`[${job.uid}] continue listening next job...`)
        }
    }
}

const nextJobSetStarted = async(client, settings) => {
    let job = await nextJob(client, settings);

    // if the worker has been deactivated, exit this loop
    if (!active) return "break";

    job.state = 'started';
    job.startedAt = new Date();

    return job;
}

/**
 * Starts worker "thread" of continious loop
 * of fetching queued projects and rendering them
 * @param  {String} host
 * @param  {String} secret
 * @param  {Object} settings
 * @return {Promise}
 */
const start = async (host, secret, settings, headers) => {
    settings = init(Object.assign({}, settings, {
        logger: console,
    }))
    settings.tracer = initTracer(settings)

    settings.logger.log('starting nexrender-worker with following settings:')
    Object.keys(settings).forEach(key => {
        settings.logger.log(` - ${key}: ${settings[key]}`)
    })

    if (typeof settings.tagSelector == 'string') {
        settings.tagSelector = settings.tagSelector.replace(/[^a-z0-9, ]/gi, '')
    }
    // if there is no setting for how many empty queues to tolerate, make one from the
    // environment variable, or the default (which is zero)
    if (!(typeof settings.tolerateEmptyQueues == 'number')) {
        settings.tolerateEmptyQueues = NEXRENDER_TOLERATE_EMPTY_QUEUES;
    }

    const client = createClient({ host, secret, headers });

    do {
        if(process.env.ENABLE_DATADOG_APM) {
            settings.logger.log("ENABLE_DATADOG_APM is enabled")
            var result = await settings.tracer.trace('job', async span => {
                let job = await nextJobSetStarted(client, settings);//

                if (job === "break") return "break";//

                span.setTag('uid', job.uid);
                return await processJob(client, settings, job)
            })

            if (result === "break") break;
        } else {
            settings.logger.log("ENABLE_DATADOG_APM is not enabled")
            let job = await nextJobSetStarted(client, settings);
            if (job === "break") break;

            let result = await processJob(client, settings, job)
            if (result === "continue") continue;
        }
    } while (active)
}

module.exports = { start }
