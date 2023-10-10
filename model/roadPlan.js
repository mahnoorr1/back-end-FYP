var mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: Buffer, 
    contentType: String, 
});
  
const roadPlanSchema = mongoose.Schema({
    startLng: {
        type: Number,
        float: true,
        required: true,
    },
    startLat: {
        type: Number,
        float: true,
        required: true,
    },
    endLng: {
        type: Number,
        float: true,
        required: true,
    },
    endLat: {
        type: Number,
        float: true,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
        enum: ['Elongation of Road', 'Development of Bridge'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    images: {
        type: [imageSchema],
    },
});

const RoadPlan = mongoose.model('RoadPlan', roadPlanSchema);

module.exports = RoadPlan;