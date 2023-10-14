var express = require('express');
var router = express.Router();
var {
    getsubscriptions,
    getOnesubscription,
    deletesubscription,
    createSubscription,
    updateSubscription
} = require('../controllers/subscription')
var {
  isAdmin
} = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createSubscription' ,createSubscription)
router.get('/getsubscriptions', getsubscriptions);
router.get('/getOnesubscription/:sid' , getOnesubscription)
router.delete('/deletesubscription/:sid' ,deletesubscription)
router.put('/updateSubscription/:sid' ,updateSubscription )

module.exports = router;

