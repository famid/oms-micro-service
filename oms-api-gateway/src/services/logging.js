const { Client } = require('@elastic/elasticsearch');
const { elasticsearchHost } = require('../config/env');

const client = new Client({ node: elasticsearchHost });

async function logEvent(event) {
    await client.index({
        index: 'api-gateway-logs',
        body: event,
    });
}

module.exports = { logEvent };
