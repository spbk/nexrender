const {name}   = require('./package.json');
const https    = require('https');
const url      = require('url');
const crypto   = require('node:crypto');
const fetch    = require('node:node-fetch');
const tls      = require('node:tls');

const { checkServerIdentity } = require('node:tls');

function sha256(s) {
    return crypto.createHash('sha256').update(s).digest('base64');
}  

module.exports = (job, settings, { input, params, ...options }, type) => {
    return async function() {

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
        const httpsAgent = new https.Agent({
            rejectUnauthorized: process.env.ACTION_WEBHOOK_SKIP_SSL_VALIDATION ? false : true,
        });
      
        const response = await fetch(params.callback, {
            method: 'post',
            body: JSON.stringify(postData),
            headers: {'Content-Type': 'application/json'},
            agent: httpsAgent,
        });
        const data = await response.json();
        console.log(data);
        if (response.status != 200) {
            throw response;
        }
        return data;

    //     const checkServerIdentity = function(host, cert) {
    //         console.log("Custom checkServerIdentity cb");
    //         if (process.env.ACTION_WEBHOOK_SKIP_SSL_VALIDATION) {
    //             return;
    //         }
    //         // Make sure the certificate is issued to the host we are connected to
    //         const err = tls.checkServerIdentity(host, cert);
    //         if (err) {
    //           console.log("tls.checkServerIdentity err: ", err);
    //           return err;
    //         }
        
    //         // Pin the public key, similar to HPKP pin-sha256 pinning
    //         if (process.env.PIN_PUB_KEY_256) {
    //             const pubkey256 = process.env.PIN_PUB_KEY_256;
    //             if (sha256(cert.pubkey) !== pubkey256) {
    //               const msg = 'Certificate verification error: ' +
    //                 `The public key of '${cert.subject.CN}' ` +
    //                 'does not match our pinned fingerprint';
    //               return new Error(msg);
    //             }
    //         }

        
    //         // Pin the exact certificate, rather than the pub key
    //         if (process.env.PIN_CERT_256) {
    //             const cert256 = process.env.PIN_CERT_256;
    //           if (cert.fingerprint256 !== cert256) {
    //             const msg = 'Certificate verification error: ' +
    //               `The certificate of '${cert.subject.CN}' ` +
    //               'does not match our pinned fingerprint';
    //             return new Error(msg);
    //           }
    //         }

        
    //         // This loop is informational only.
    //         // Print the certificate and public key fingerprints of all certs in the
    //         // chain. Its common to pin the public key of the issuer on the public
    //         // internet, while pinning the public key of the service in sensitive
    //         // environments.
    //         do {
    //           console.log('Subject Common Name:', cert.subject.CN);
    //           console.log('  Certificate SHA256 fingerprint:', cert.fingerprint256);
        
    //           hash = crypto.createHash('sha256');
    //           console.log('  Public key ping-sha256:', sha256(cert.pubkey));
        
    //           lastprint256 = cert.fingerprint256;
    //           cert = cert.issuerCertificate;
    //         } while (cert.fingerprint256 !== lastprint256);
        
    //       };
    //     const http_options = {
    //         hostname: callback_url.host,
    //         path: callback_url.path,
    //         port: 443,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             //'Content-Length': Buffer.byteLength(postData)
    //         },
    //         rejectUnauthorized: process.env.ACTION_WEBHOOK_SKIP_SSL_VALIDATION ? false : true,
    //         checkServerIdentity: checkServerIdentity,
    //         //agent: false,
    //     };
  
    //     http_options.agent = new https.Agent(http_options);
    //     console.log(http_options);
    //     const req = https.request(http_options, (res) => {
    //       console.log('All OK. Server matched our pinned cert or public key');
    //       console.log('statusCode:', res.statusCode);
    //       // Print the HPKP values
    //       console.log('headers:', res.headers['public-key-pins']);
        
    //       var str = '';
    //       res.setEncoding('utf8');
    //       //another chunk of data has been received, so append it to `str`
    //       res.on('data', function (chunk) {
    //           str += chunk;
    //       });
          
    //       //the whole response has been received, so we just print it out here
    //       res.on('end', function () {
    //           //console.log("Got response back: ", str);
    //           //res = JSON.parse(str);
    //           //console.log("JSON response: ", res);
    //           console.log("response code: ", res.statusCode);
    //           if (res.statusCode >= 200 && res.statusCode <= 299) {
    //               resolve(res);
    //           }
    //           else {
    //               reject(res);
    //           }
    //       });
    //     });
        
    //     req.on('error', (e) => {
    //       reject(e.message);
    //     });

    //     console.log("Sending job ", postData);  
    //     req.write(postData);
    //     req.end();
    // });
    }
}
