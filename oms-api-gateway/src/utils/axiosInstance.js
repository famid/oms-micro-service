const axios = require('axios');

// Configure Axios instance
const axiosInstance = axios.create({
    timeout: 10000, // Set timeout to 10 seconds
});

module.exports = axiosInstance;
