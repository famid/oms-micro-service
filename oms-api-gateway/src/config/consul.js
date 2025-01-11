const Consul = require('consul');
const { consulHost, consulPort } = require('./env');

const consul = new Consul({
    host: consulHost,
    port: consulPort,
    promisify: true,
});

module.exports = consul;
