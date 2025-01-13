module.exports = (err, req, res, next) => {
    console.error('Errorr:', err, 'Response: ', res); // Log the error message for debugging

    if (err.response) {
        // Forward the exact response from the microservice
        res.status(err.response.status).send(err.response.data);
    } else if (err.request) {
        // If no response is received from the microservice
        res.status(500).send({
            status: false,
            statusCode: 500,
            message: 'No response received from the service.',
            error: err.message,
        });
    } else {
        // Handle unexpected errors
        res.status(500).send({
            status: false,
            statusCode: 500,
            message: err.message || 'Internal server error.',
        });
    }
};
