const {name}   = require('./package.json')
const http     = require('http');
const url      = require('url');

module.exports = (job, settings, { input, params, ...options }, type) => {
    return new Promise((resolve, reject) => {
        
        settings.logger.log(`[${job.uid}] starting action-webhook action`)

        /* check if input has been provided */
        //input = input || job.output;
        // console.log("Input: ", input);
        // console.log("params: ", params);
        // console.log("options: ", options);
        // console.log("type: ", type);
        // console.log("job: ", job);
        // console.log("settings: ", settings);

        const callback_url = url.parse(params.callback);
        const postData = JSON.stringify(job);
        var http_options = {
            hostname: callback_url.host,
            path: callback_url.path,
            port: callback_url.protocol == "https:" ? 443 : 80,
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
                console.log("Got response back: ", str);
                res = JSON.parse(str);
                console.log("JSON response: ", res);
                console.log("response code: ", response.statusCode);
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
        }
        
        console.log("Sending job ", postData);
        req = http.request(http_options, callback)
        req.write(postData);
       // req.write('{"string": '+postData+'}');

        req.end();
    });
}
