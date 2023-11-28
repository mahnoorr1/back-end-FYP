var express = require('express');
var router = express.Router();
var {
    Construction,
    getPlans,
    getOnePlan
} = require('../controllers/Buildings')
var {
  isAdmin ,isLoggedIn
} = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getReportOfConstruction',isLoggedIn, Construction);
router.get('/getConstructionPlans',isAdmin, getPlans);
router.get('/getOnePlan/:Pid' ,isAdmin, getOnePlan)

module.exports = router;

