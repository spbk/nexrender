const {name}   = require('./package.json')
const http     = require('http');
const url      = require('url');

module.exports = (job, settings, { input, params, ...options }, type) => {
    return new Promise((resolve, reject) => {
        
        settings.logger.log(`[${job.uid}] starting action-webhook action`)

        /* check if input has been provided */
        input = input || job.output;
        console.log("Input: ", input);
        console.log("params: ", params);
        console.log("options: ", options);
        console.log("type: ", type);
        console.log("job: ", job);
        console.log("settings: ", settings);

        const callback_url = url.parse(params.callback);
        const postData = JSON.stringify(job);
        var http_options = {
            host: callback_url.host,
            path: callback_url.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        callback = function(response) {
            var str = '';
            
            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });
            
            //the whole response has been received, so we just print it out here
            response.on('end', function () {
                res = JSON.parse(str);
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
        }
        
        req = http.request(http_options, callback)
        req.write(postData);
        req.end();
    });
}
