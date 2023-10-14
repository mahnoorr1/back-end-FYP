var mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: Buffer, 
    contentType: String, 
});
  
const constructionSchema = mongoose.Schema({
    constructionType: {
        type: String,
        required: true
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
    PlotMeasurement: {
        type: Number,
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
        type: Object,
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