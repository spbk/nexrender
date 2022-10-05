const {name}   = require('./package.json');
const https    = require('https');
const fetch    = require('cross-fetch');


module.exports = (job, settings, { input, params, ...options }, type) => {
        return new Promise(async function(resolve, reject) {
            settings.logger.log(`[${job.uid}] starting action-webhook action`)

            const httpsAgent = new https.Agent({
                rejectUnauthorized: params.skip_ssl_validation ? false : true,
            });
            const response = await fetch(params.callback, {
                method: params.http_method || 'post',
                body: JSON.stringify(job),
                headers: {'Content-Type': 'application/json'},
                agent: httpsAgent,
            });
            const data = await response.json();
            console.log(data);

            if (response.status != 200) {
                throw response;
            }
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
}
