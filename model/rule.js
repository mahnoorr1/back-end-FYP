var mongoose = require('mongoose');

const ruleSchema = mongoose.Schema({
    zone: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
    },
    sector: {
        type: String,
    },
    plotSize: {
        type: String,
    },
    roadDistance: {
        type: String,
    },
    type: {
        type: String,
        enum: ['commercial', 'residential'],
    }
})

const Rule = mongoose.model('Rule', ruleSchema);
module.exports = Rule;