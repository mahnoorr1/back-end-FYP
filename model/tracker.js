var mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: Buffer, 
    contentType: String, 
});
const trackerSchema = mongoose.Schema({
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
    resultImages: {
        type: [imageSchema],
    },
    initialImage: {
        type: imageSchema,
    },
    detectedChange: {
        type: String,
        enum: ['building', 'road', 'greenland'],
    },
    changePercentage: {
        type: Number,
    },
    details: {
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['restrictor', 'construction tracker'],
    },
});

const Tracker = mongoose.model('Tracker', trackerSchema);

module.exports = Tracker;