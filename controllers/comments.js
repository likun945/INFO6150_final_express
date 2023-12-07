const Comments = require('../models/comments');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/index');
const mongoose = require('mongoose');
exports.getComments = async (req, res) => {
    try {
        const { attraction_id } = req.query;
        const comments = await Comments.find({ attraction_id }, '-_id');
        res.success({ comments, total: comments.length }, 'Comments retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

exports.addComment = async (req, res) => {
    try {
        const { attraction_id, review_title, star_rating, detailed_review } = req.body;
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, secretKey);
        const { email } = decoded;
        const user = await User.findOne({ email });
        if (!user) {
            return res.error(404, 'User not found');
        }
        const review_time = new Date().getTime();
        const newComment = new Comments({
            review_id: new mongoose.Types.ObjectId(),
            attraction_id,
            reviewer_name: user.fullName,
            reviewer_email: user.email,
            reviewer_id: user.userId,
            avatar: user.avatar,
            review_title,
            review_time,
            star_rating,
            detailed_review,
            status: 1
        });
        await newComment.save();
        res.success({ newComment }, 'Comment added successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { review_id } = req.query;
        const comment = await Comments.findOne({ review_id });
        if (!comment) {
            return res.error(404, 'Comment not found');
        }
        comment.status = comment.status === 0 ? 1 : 0;
        await comment.save();
        res.success({ comment }, 'Status updated successfully');
    } catch (error) {
        console.log(error)
        res.error(500, 'Internal server error');
    }
};

module.exports = exports;
