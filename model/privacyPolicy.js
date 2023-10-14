var mongoose = require('mongoose');

const PrivacyPolciesSchema = mongoose.Schema({
    Privacy_Policy : {
        type: String,
        required: true
    },
    System_Term : {
        type:String ,
        required:true
    }
})

const PrivacyPolicy = mongoose.model('PrivacyPolicy', PrivacyPolciesSchema ,  'PrivacyPolicies');
module.exports = PrivacyPolicy;