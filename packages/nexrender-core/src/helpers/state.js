const tracer       = require('./tracer')

module.exports = (job, settings, fn, fnName) => {
    var renderPrefix = `render.${fnName}`
    return tracer.trace(renderPrefix, _span1 => {
        job.state = `render:${fnName}`;

        if (job.onChange) {
            return tracer.trace(`${renderPrefix}.onChange`, _span2 => {
                return job.onChange(job, job.state);
            })
        }
    
        return fn(job, settings);
    })
}
