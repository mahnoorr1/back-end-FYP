const PrivacyPolicy = require('../model/privacyPolicy');

const getPrivacyPolicy = 
    async (req, res, next) => {

        try {
            const getPolicies = await PrivacyPolicy.findOne({});
            return res.send(getPolicies); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error fetching rules.' });
        }
    };


const UpdatePolicies = 
    async (req, res, next) => {
        const policyId = req.params.policyId;
        const updatedData = req.body;
    
        try {
            const updatedPolicy = await PrivacyPolicy.findByIdAndUpdate(policyId, updatedData, { new: true });
        
            if (!updatedPolicy) {
            return res.status(404).json({ message: 'Rule not found.' });
            }
        
            return  res.send(updatedPolicy); 
        } catch (error) {
            console.error('Error updating rule:', error);
            return res.status(500).json({ message: 'Error updating rule.' });
        }
    };


module.exports = {
    getPrivacyPolicy,
    UpdatePolicies
}

