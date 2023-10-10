var mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
    {   
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true, 
        },
        date: {
            type: Date,
            default: Date.now,
        },
        type: {
            type: String,
            required: true,
            enum: ['report', 'feedback'],
        }
    }
)

const feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = feedback;