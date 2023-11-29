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
 var { emailUser } = require('../controllers/mailUser')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAlerts', getAlerts);
router.get('/getOneAlert/:aid' , getOneAlert)
router.delete('/deleteAlert/:aid' ,deleteAlert)

router.post('/mailUser/:aid',emailUser)

module.exports = router;

