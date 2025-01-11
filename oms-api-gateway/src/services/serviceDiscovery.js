const consul = require('../config/consul');

async function getServiceUrl(serviceName) {
    const services = await consul.agent.service.list();
    const service = Object.values(services).find((s) => s.Service === serviceName);
    if (!service) throw new Error(`Service ${serviceName} not found in Consul`);
    return `http://${service.Address}:${service.Port}`;
}

module.exports = { getServiceUrl };
