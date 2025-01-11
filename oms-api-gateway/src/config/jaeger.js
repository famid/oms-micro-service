const initTracer = require('jaeger-client').initTracer;

const config = {
    serviceName: 'api-gateway',
    reporter: {
        logSpans: true,
    },
    sampler: {
        type: 'const',
        param: 1,
    },
};

const tracer = initTracer(config);
module.exports = tracer;
