const express = require('express');
const axios = require("axios");

function createServiceRouter(baseUrl) {
    if (!baseUrl) {
        throw new Error('Base URL for the service must be provided.');
    }

    const router = express.Router();

    router.all('*', async (req, res, next) => {
        try {
            const targetUrl = `${baseUrl}${req.originalUrl}`;
            console.log(targetUrl);

            // Forward the request dynamically based on the HTTP method
            let response;
            switch (req.method.toUpperCase()) {
                case 'GET':
                    response = await axios.get(targetUrl, {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${req.headers.authorization}`,
                    });
                    break;
                case 'POST':
                    response = await axios.post(targetUrl, req.body, {
                       'Content-Type': 'application/json',
                        Authorization: `Bearer ${req.headers.authorization}`,
                    });
                    break;
                case 'PUT':
                    response = await axios.put(targetUrl, req.body, {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${req.headers.authorization}`,
                    });
                    break;
                case 'PATCH':
                    response = await axios.patch(targetUrl, req.body, {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${req.headers.authorization}`,
                    });
                    break;
                case 'DELETE':
                    response = await axios.delete(targetUrl, {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${req.headers.authorization}`,
                    });
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${req.method}`);
            }

            console.log(`[Gateway -> ${baseUrl}] Response:`, response.data);

            res.status(response.status).send(response.data);
        } catch (err) {
            if (err.response) {
                console.error('Error Response from Microservice:', err.response.data);
                res.status(err.response.status).send(err.response.data);
            } else {
                console.error('Unknown Error:', err.message);
                next(err);
            }
        }
    });



    return router;
}

module.exports = createServiceRouter;

