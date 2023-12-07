const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    id: String,
    name: String,
    location: String,
    description: String,
    detailed_description: String,
    type: String,
    image: Array,
    website: String,
    official_tel: String,
    rating: Number,
    reviews: Number,
    opening_hours: String,
    tips: String
});

const Attractions = mongoose.model('attractions', attractionSchema);

module.exports = Attractions;