var mongoose = require('mongoose');

const ruleSchema = mongoose.Schema({
    Maximum_No_of_storeys:{
        type: String,
        required : true
    },
    Maximum_FAR:{
        type: String,
    },
    Maximum_Ground_coverage:{
        type: String,
    },
    Setbacks:{
        type: String,
    },
    Basement:{
        type: String,
    },
    Contstruction_Type:{
        type: String,
    },
    Plot_Measurment_Min:{
        type: Number
    },
    Plot_Measurment_Max:{
        type: Number
    },
    Front_Setback_Min:{
        type:mongoose.Schema.Types.Mixed
    },
    Other:{
        type: String,
    }

})

const Rule = mongoose.model('Rule', ruleSchema, 'Rules');

module.exports = Rule;