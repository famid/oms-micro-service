const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.API_GATEWAY_PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    inventoryBaseUrl: process.env.INVENTORY_BASE_URL, // Static Inventory Service URL
    orderBaseUrl: process.env.ORDER_BASE_URL,         // Static Order Service URL
    paymentBaseUrl: process.env.PAYMENT_BASE_URL,     // Static Payment Service URL
    authBaseUrl: process.env.AUTH_BASE_URL,           // Static Auth Service URL
    elasticsearchHost: process.env.ELASTICSEARCH_HOST,
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000,
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
};
