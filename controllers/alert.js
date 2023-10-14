const Alert = require('../model/alert')


const getAlerts = async (req, res, next) => {
    try {
        const alerts = await Alert.find()
            .populate({
                path: 'admin',
                select: 'firstname lastname email', // Select the fields you want
            })
            .exec();

        res.send(alerts);
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
        res.status(500).json({ error: 'An error occurred' });
    }
};




const getOneAlert = async(req,res,next) => {
    try {
        const getAlert = await Alert.findById(req.params.aid).populate({
            path: 'admin',
            select: 'firstName lastName email', 
        })
        .exec();
        if(!getAlert){
            return res.status(404).json({ message: 'Alert not found.' }); 
        }
        return res.send(getAlert)
    } catch (error) {
        console.error(error)
    }
}

const deleteAlert = async (req, res) => {
    try {
        const deletedAlert = await Alert.findByIdAndDelete(req.params.aid);
        if (deletedAlert) {
    
        return res.status(204).send();
        } else {
        return res.status(404).json({ message: 'Alert not found.' }); 
        }
    } catch (error) {
        console.error(error)
    }
  }


module.exports = {
    getAlerts,
    getOneAlert,
    deleteAlert
}