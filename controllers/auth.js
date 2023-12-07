const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const secretKey = config.secretKey;

exports.logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.error(401, 'Authentication failed');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.error(401, 'Invalid password');
        }

        const token = jwt.sign({ email }, secretKey, { expiresIn: 86400 });
        res.success({ token, user }, 'Authentication successful');   
    } catch (error) {
        res.error(500, error.message);
    }
}

module.exports = exports;