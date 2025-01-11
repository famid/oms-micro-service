const express = require('express');
const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimiter');
const tracing = require('./middlewares/tracing');
const jwtValidation = require('./middlewares/jwtValidation');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const inventoryRoutes = require('./routes/inventory');
const paymentRoutes = require('./routes/payment');
const axios = require("axios");


const app = express();

// Middleware
app.use(express.json()); // Adjust the size limit if necessary
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded body
app.use(cors);
app.use(rateLimiter);
app.use(tracing);

// Service routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', jwtValidation, orderRoutes);
app.use('/api/v1/inventory', jwtValidation, inventoryRoutes);
app.use('/api/v1/payment', jwtValidation, paymentRoutes);

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
