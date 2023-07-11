var tracer

class NoopSpan {
    setTag(_key, _value) { return this }
}

class NoopTracer {
    wrap(_name, cb) { return cb() }

    trace(_name, cb) { return cb(new NoopSpan()) }
}

if(process.env.ENABLE_DATADOG_APM) {
    tracer = require('dd-trace').init();
} else {
    // define noop tracer if datadog is not enabled
    tracer =  new NoopTracer()
}

module.exports = tracer;
