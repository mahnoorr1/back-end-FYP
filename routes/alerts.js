var express = require('express');
var router = express.Router();
var {
    getAlerts,
    getOneAlert,
    deleteAlert
} = require('../controllers/alert')
var {
  isAdmin
} = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAlerts',isAdmin, getAlerts);
router.get('/getOneAlert/:aid' , getOneAlert)
router.delete('/deleteAlert/:aid' ,deleteAlert)

module.exports = router;

