const createServiceRouter = require('./serviceRouter');
const { inventoryBaseUrl } = require('../config/env'); // Static base URL

module.exports = createServiceRouter(inventoryBaseUrl);

