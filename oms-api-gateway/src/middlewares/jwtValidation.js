const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Attach user data
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};
