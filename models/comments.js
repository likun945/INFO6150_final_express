const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    review_id: String,
    attraction_id: String,
    reviewer_name: String,
    reviewer_email: String,
    reviewer_id: String,
    review_title: String,
    review_time: {
        type: Date,
        get: v => Math.round(v.getTime())
    },
    star_rating: Number,
    avatar: String,
    detailed_review: String,
    status: {
        type: Number,
        default: 1
    }// 1: approved, 0:  rejected
});


const Attractions = mongoose.model('comments', schema);

module.exports = Attractions;