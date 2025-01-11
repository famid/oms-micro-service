const cors = require('cors');

module.exports = cors({
    origin: '*', // Allow all origins (adjust for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
