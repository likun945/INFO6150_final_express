const model = require('../models/country');
exports.getAllCountries = async (req, res) => {
    try {
        const countries = await model.find({}, '-_id');
        res.success({ countries }, 'Countries retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};
module.exports = exports;
