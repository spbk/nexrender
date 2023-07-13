var tracer

class NoopSpan {
    setTag(_key, _value) { return this }
}

class NoopTracer {
    wrap(_name, cb) { return cb() }

    trace(_name, cb) { return cb(new NoopSpan()) }
}

console.log("process.env.ENABLE_DATADOG_APM: " + process.env.ENABLE_DATADOG_APM)
console.log("process.env.DD_TRACE_AGENT_URL: " + process.env.DD_TRACE_AGENT_URL)

if(process.env.ENABLE_DATADOG_APM) {
    console.log("Datadog APM enabling...");
    tracer = require('dd-trace').init();
    console.log(JSON.stringify(tracer.options))
} else {
    // define noop tracer if datadog is not enabled
    tracer =  new NoopTracer()
}

module.exports = tracer;
