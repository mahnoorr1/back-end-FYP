var express = require('express');
var router = express.Router();
var {
    Construction,
    getPlans,
    getOnePlan
} = require('../controllers/Buildings')
var {
  isAdmin
} = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getReportOfConstruction',isAdmin, Construction);
router.get('/getConstructionPlans',isAdmin, getPlans);
router.get('/getOnePlan/:Pid' , getOnePlan)

module.exports = router;

