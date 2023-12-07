const mongoose = require('mongoose');
const config = require('../config/index');
const connectToDatabase = () => {
    mongoose.connect(config.dbURL, { useNewUrlParser: true })
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.error('Error connecting to the database:', err);
        });
};

module.exports = {
    connectToDatabase,
};