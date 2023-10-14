var mongoose = require('mongoose')

const alertSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    //here will be user but for now it is admin
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', 
        required: true, 
    },
    //to differentiate and filter by category
    type: {
        type: String,
        required: true,
        enum: ['tracker', 'construction plan', 'road plan', 'user activity'],
    },
    // time: {
    //     type: Date,
    //     default: Date.now,
    // },
    // referenceId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     refPath: 'typeRef',
    // },
    // //could be any of type tracker, construction plan, road plan or user
    // typeRef: {
    //     type: String,
    //     required: true,
    //     enum: ['Tracker', 'ConstructionPlan', 'RoadPlan', 'User'],
    // },
}
,
{
    timestamps: true,
  }
  );
const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;