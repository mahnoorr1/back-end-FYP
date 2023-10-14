const feedback = require('../model/feedback')


const CreateFeedback = async(req,res,next)=>{
        try {
            const  feedbackData  = req.body; 

            const newfeedback = await feedback.create(feedbackData);
            
            return res.status(201).json(newfeedback); 
          } catch (error) {
            console.error('Error adding newfeedback:', error);
            return res.status(500).json({ message: 'Error adding rule.' });
          }

           
}

const getfeedbacks = async (req, res, next) => {

        try {
            const getfeedbacks = await feedback.find();
        

        
            return res.send(getfeedbacks); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error fetching feedbacks.' });
        }
    };

const getfeedback = async (req, res, next) => {

        const feedbackId = req.params.feedbackId
        try {
            const getfeedback = await feedback.findById(feedbackId);
        
            if(!getfeedback){
                return res.status(404).json({ message: 'feedback not found.' });
            }
        
            return res.send(getfeedback); 
        } catch (error) {
            console.error('Error :', error);
            return res.status(500).json({ message: 'Error finding feedback.' });
        }
    };

module.exports = {
    getfeedbacks,
    getfeedback,
    CreateFeedback
}