const Attraction = require('../models/attraction');
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find({}, '-_id');
        res.success({ attractions, total: attractions.length }, 'Attractions retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

exports.getAttractionDetail = async (req, res) => {
    try {
        const { id } = req.query;
        const attraction = await Attraction.findOne({id}, '-_id');
        res.success({ attraction }, 'Attraction detail retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
}
exports.getAttractionAndComments = async (req, res) => {
    try {
        const attractions = await Attraction.aggregate([
            {
                $lookup: {
                    from: "comments", 
                    localField: "id", 
                    foreignField: "attraction_id", 
                    as: "comments_data"
                }
            },
            {
                $unwind: {
                    path: "$comments_data",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    id: { $first: "$id" },
                    name: { $first: "$name" },
                    location: { $first: "$location" },
                    description: { $first: "$description" },
                    detailed_description: { $first: "$detailed_description" },
                    type: { $first: "$type" },
                    image: { $first: "$image" },
                    website: { $first: "$website" },
                    official_tel: { $first: "$official_tel" },
                    rating: { $first: "$rating" },
                    reviews: { $first: "$reviews" },
                    opening_hours: { $first: "$opening_hours" },
                    tips: { $first: "$tips" },
                    comments_count: { 
                        $sum: {
                            $cond: { if: "$comments_data", then: 1, else: 0 }
                        }
                    },
                    latest_comment_time: { $max: "$comments_data.review_time" },
                    comments: { $push: "$comments_data" }
                }
            },
            {
                $sort: { id: 1 }
            },
            {
                $project: {
                    _id: 0, 
                    id: 1,
                    name: 1,
                    location: 1,
                    description: 1,
                    detailed_description: 1,
                    type: 1,
                    image: 1,
                    website: 1,
                    official_tel: 1,
                    rating: 1,
                    reviews: 1,
                    opening_hours: 1,
                    tips: 1,
                    comments_count: 1,
                    latest_comment_time: 1,
                    comments: 1
                }
            }
        ]);

        if (attractions.length === 0) {
            return res.error(404, 'No attractions found');
        }

        res.success({ attractions }, 'Attraction list retrieved successfully');
    } catch (error) {
        console.log(error);
        res.error(500, 'Internal server error');
    }
};


module.exports = exports;
