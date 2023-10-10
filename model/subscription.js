var mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['basic', 'standard', 'premium'],
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,   //number of weeks
        required: true,
    },
    projectsAllowed: {
        type: Number,
        required: true,
    },
    constructionPlanAllowed: {
        type: Boolean,
        required: true,
        default: true,
    },
    RoadPlanAllowed: {
        type: Boolean,
        required: true,
    },
    rulesAccess: {
        type: Boolean,
        required: true,
        default: true,
    },
    routesAccess: {
        type: true,
    },

});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;