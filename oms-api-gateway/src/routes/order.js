const createServiceRouter = require('./serviceRouter');
const { orderBaseUrl } = require('../config/env'); // Static base URL

module.exports = createServiceRouter(orderBaseUrl);


