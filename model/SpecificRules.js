var mongoose = require('mongoose');

const SpecificRuleSchema = mongoose.Schema({
    TYPE : {
        type: String,
        required: true
    },
    SPACE : {
        type: String,
    },
    MINIMUM_AREA :{
        type: String,
    },
    RELAXABLE_WITH_PENALTY :{
        type: String,
    },
    MINIMUM_HEIGHT :{
        type: String,
    },
    RELAXABLE_WITH_PENALTY__1 :{
        type: String,
    },
    MINIMUM_WIDTH :{
        type: String,
    },
    RELAXABLE_WITH_PENALTY__2 :{
        type: String,
    },
})

const SpecificRule = mongoose.model('SpecificRule', SpecificRuleSchema ,  'SpecificRules');
module.exports = SpecificRule;