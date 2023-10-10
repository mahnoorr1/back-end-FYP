var mongoose = require('mongoose');

const termsSchema = mongoose.Schema({
    policy: {
        type: String,
        required: true,
    },
    terms: {
        type: String,
        required: true,
    }
})

const Terms = mongoose.model('Terms', termsSchema);

module.exports = Terms;