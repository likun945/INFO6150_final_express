const customResponseMiddleware = (req, res, next) => {
    res.success = (data, message) => {
        res.status(200).json({ success: true, data, message });
    };

    res.error = (statusCode, message) => {
        res.status(statusCode).json({ success: false, message });
    };

    next();
};

module.exports = customResponseMiddleware;
