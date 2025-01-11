const createServiceRouter = require('./serviceRouter');
const { paymentBaseUrl } = require('../config/env'); // Static base URL

module.exports = createServiceRouter(paymentBaseUrl);
