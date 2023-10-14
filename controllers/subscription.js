const Subscription = require('../model/subscription')

const getsubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find()
            

        return res.send(subscriptions);
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const getOnesubscription = async(req,res,next) => {
    try {
        const getSubscription = await Subscription.findById(req.params.sid)
        if(!getSubscription){
            return res.status(404).json({ message: 'Subscription not found.' }); 
        }
        return res.send(getSubscription)
    } catch (error) {
        console.error(error)
    }
}

const deletesubscription = async (req, res , next) => {
    try {
        const deletedsubscription = await Subscription.findByIdAndDelete(req.params.sid);
        if (deletedsubscription) {
    
        return res.status(204).send();
        } else {
        return res.status(404).json({ message: 'Subscription not found.' }); 
        }
    } catch (error) {
        return res.status(500).json({ message: error }); 
    }
}

const createSubscription = async(req , res , next) => {
    try {
        const subData =  req.body

        const createSubscription = await Subscription.create(subData)

        if(createSubscription){
            return res.status(201).json(createSubscription)
        }
        else{
            return res.status(500).json({ message: "error creating subscription" })
        }
    } catch (error) {
        return res.status(500).json({ message: error }); 
    }
}

const updateSubscription = async (req, res) => {
    const sub = await Subscription.findById(req.params.sid)
  
    if (sub) {
      
        sub.type = req.body.type || sub.type
        sub.price = req.body.price || sub.price
        sub.duration = req.body.email || sub.duration
        sub.projectsAllowed = req.body.projectsAllowed || sub.projectsAllowed
        sub.constructionPlanAllowed = req.body.constructionPlanAllowed || sub.constructionPlanAllowed
        sub.RoadPlanAllowed = req.body.RoadPlanAllowed || sub.RoadPlanAllowed
        sub.routesAccess = req.body.routesAccess || sub.routesAccess
        sub.rulesAccess = req.body.rulesAccess || sub.rulesAccess
        sub.support_per_day = req.body.support_per_day || sub.support_per_day
        
        const updatedsub = await sub.save()
    
        return res.json(updatedsub)

    } else {
      return res.status(404).json({ message: 'Subscription not found.' }); 
    }
  }

module.exports = {
    getsubscriptions,
    getOnesubscription,
    deletesubscription,
    createSubscription,
    updateSubscription
}