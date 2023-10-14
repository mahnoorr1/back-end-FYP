const feedbackResponse = require('../model/feedbackResponse')


const CreatefeedbackResponse = async(req,res,next)=>{
        try {
            const  feedbackData  = req.body; 

            const newfeedbackResponse = await feedbackResponse.create(feedbackData);
            
            return res.status(201).json(newfeedbackResponse); 
          } catch (error) {
            console.error('Error adding newfeedback:', error);
            return res.status(500).json({ message: 'Error adding rule.' });
          }

           
}

const getfeedbackResponses = async (req, res, next) => {

        try {
            const getfeedbacks = await feedbackResponse.find();
        

        
            return res.send(getfeedbacks); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error fetching feedbacks.' });
        }
    };

const getfeedbackResponse = async (req, res, next) => {

        const fRId = req.params.fRId
        try {
            const getfeedback = await feedbackResponse.findById(fRId);
        
            if(!getfeedback){
                return res.status(404).json({ message: 'feedback Responsenot found.' });
            }
        
            return res.send(getfeedback); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error finding feedback.' });
        }
    };

module.exports = {
    getfeedbackResponse,
    getfeedbackResponses,
    CreatefeedbackResponse
}