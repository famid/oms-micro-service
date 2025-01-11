const rateLimit = require('express-rate-limit');
const { rateLimitWindowMs, rateLimitMaxRequests } = require('../config/env');

module.exports = rateLimit({
    windowMs: rateLimitWindowMs, // Time window in milliseconds
    max: rateLimitMaxRequests, // Maximum number of requests per window
    message: { error: 'Too many requests, please try again later.' },
});
