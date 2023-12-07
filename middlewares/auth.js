const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/index');

exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.error(401, 'Access denied. No token provided');
    }
    const tokenWithoutPrefix = token.replace('Bearer ', '');
    jwt.verify(tokenWithoutPrefix, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.error(401, 'Token has expired');
            }
            return res.error(401, 'Invalid token');
        }
        req.user = decoded;
        next();
    });
}

exports.userCanEdit = (req, res, next) => {
    const { email } = req.body;
    if (email !== req.user.email) {
        return res.error(403, 'Access denied. You can only edit your own information');
    }

    next();
};

