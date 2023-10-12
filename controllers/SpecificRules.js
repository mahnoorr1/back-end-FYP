const SpecificRules = require('../model/SpecificRules');
var AsyncHandler = require("express-async-handler");


const getAllRules = 
    async (req, res, next) => {

        try {
            const getRules = await SpecificRules.find();
        

        
            return res.send(getRules); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error fetching rules.' });
        }
    };

const getOneRule = 
    async (req, res, next) => {

        const ruleId = req.params.ruleId
        try {
            const getRule = await SpecificRules.findById(ruleId);
        
            if(!getRule){
                return res.status(404).json({ message: 'Rule not found.' });
            }
        
            return res.send(getRule); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error finding rule.' });
        }
    };

const CreateRule = 
    AsyncHandler(async(req,res,next)=>{
        try {
            const  ruleData  = req.body; 

            const newRule = await SpecificRules.create(ruleData);
            
            return res.status(201).json(newRule); 
          } catch (error) {
            console.error('Error adding rule:', error);
            return res.status(500).json({ message: 'Error adding rule.' });
          }
        
            
    
           
    }
    )


const UpdateRule = 
    async (req, res, next) => {
        const ruleId = req.params.ruleId;
        const updatedData = req.body;
    
        try {
            const updatedRule = await SpecificRules.findByIdAndUpdate(ruleId, updatedData, { new: true });
        
            if (!updatedRule) {
            return res.status(404).json({ message: 'Rule not found.' });
            }
        
            return  res.status(200).json(updatedRule); 
        } catch (error) {
            console.error('Error updating rule:', error);
            return res.status(500).json({ message: 'Error updating rule.' });
        }
    };

const DeleteRule = async (req, res, next) => {
      const ruleId = req.params.ruleId;
    
      try {
        const deletedRule = await SpecificRules.findByIdAndDelete(ruleId);
    
        if (!deletedRule) {
          return res.status(404).json({ message: 'Rule not found.' });
        }
    
        return res.status(204).send(); 
      } catch (error) {
        console.error('Error deleting rule:', error);
        return res.status(500).json({ message: 'Error deleting rule.' });
      }
    };

module.exports = {
    getAllRules,
    getOneRule,
    CreateRule,
    UpdateRule,
    DeleteRule
}

