const fetch = require('isomorphic-unfetch')

const createClient = ({ host, secret, polling, headers, settings }) => {
    console.log("creating client")
    settings.logger.log("testing in create client")

    settings.logger.debug("defining wrapped fetch")
    const wrappedFetch = async (path, options) => {
        settings.logger.debug("wrapped fetch", path, options)
        options = options || {}

        const defaultHeaders = {};
        if(headers){
            for(const [key, value] of Object.entries(headers)){
                if(typeof value === "string"){
                    defaultHeaders[key] = value;
                }else if(typeof value === "function"){
                    defaultHeaders[key] = await value();
                }
            }
        }

        options.headers = Object.assign(defaultHeaders, options.headers);

        if (secret) {
            options.headers['nexrender-secret'] = secret
        }

        settings.logger.debug("fetching", `${host}/api/v1${path}`, options)
        const response = await fetch(`${host}/api/v1${path}`, options)

        if (!response.ok) {
            throw new Error(await response.text())
        }

        return await response.json();
    }

    settings.logger.debug("defined!")
    return Object.assign({ secret, host },
        require('./job')(wrappedFetch, polling),
    );
}

module.exports = {
    createClient,
}
