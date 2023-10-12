var express = require('express');
var router = express.Router();
var {
    CreateRule, UpdateRule, DeleteRule, getAllRules, getOneRule
} = require('../controllers/SpecificRules')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllRules' , getAllRules)
router.get('/getRule/:ruleId' , getOneRule)
router.post('/createRule', CreateRule);
router.put('/updateRule/:ruleId' ,UpdateRule)
router.delete('/deleteRule/:ruleId' , DeleteRule)


module.exports = router;

