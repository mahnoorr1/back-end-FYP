var mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: Buffer, 
    contentType: String, 
});
  
const constructionSchema = mongoose.Schema({
    constructionType: {
        type: String,
        required: true,
        enum: ['commercial', 'residential'],
    },
    lng: {
        type: Number,
        float: true,
        required: true,
    },
    lat: {
        type: Number,
        float: true,
        required: true,
    },
    zone: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    location: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userType',
    },
    userType: {
        type: String,
        enum: ['Admin', 'User'],
    },
    rules: {
        type: [String],
        default: [], 
    },
    roadDistance: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    images: {
        type: [imageSchema],
    },
});

const ConstructionPlan = mongoose.model('ConstructionPlan', constructionSchema);

module.exports = ConstructionPlan;