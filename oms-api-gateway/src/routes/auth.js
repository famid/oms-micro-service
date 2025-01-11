const createServiceRouter = require('./serviceRouter');
const { authBaseUrl } = require('../config/env'); // Static base URL

module.exports = createServiceRouter(authBaseUrl);
