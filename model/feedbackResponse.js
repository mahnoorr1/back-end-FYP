var mongoose = require('mongoose')

const feedbackResponseSchema = mongoose.Schema(
    {   
        feedback: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feedback', 
            required: true, 
        },
        description: {
            type: String,
            required: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin', 
            required: true, 
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
)

const feedbackResponse = mongoose.model('FeedbackResponse', feedbackResponseSchema);

module.exports = feedbackResponse;