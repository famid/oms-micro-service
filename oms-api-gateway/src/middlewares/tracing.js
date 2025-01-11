const tracer = require('../config/jaeger');

module.exports = (req, res, next) => {
    const span = tracer.startSpan(`${req.method} ${req.originalUrl}`);
    req.span = span; // Attach span to the request
    res.on('finish', () => {
        span.finish(); // Finish span when response is sent
    });
    next();
};
