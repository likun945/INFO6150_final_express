const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: String,
    name: String,
});

const model = mongoose.model('countries', schema);

module.exports = model;