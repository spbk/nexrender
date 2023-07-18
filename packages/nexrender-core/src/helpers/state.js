module.exports = (job, settings, fn, fnName) => {
    var renderPrefix = `render.${fnName}`
    if (settings.tracer) {
        return settings.tracer.trace(renderPrefix, _span1 => {
            job.state = `render:${fnName}`;
    
            if (job.onChange) {
                return settings.tracer.trace(`${renderPrefix}.onChange`, _span2 => {
                    return job.onChange(job, job.state);
                })
            }
        
            return fn(job, settings);
        })    
    } else {
        job.state = `render:${fnName}`;
        if (job.onChange) {
            return job.onChange(job, job.state);
        }

        return fn(job, settings);
    }
}
