var express = require('express');
var router = express.Router();
var {
    CreateRule, UpdateRule, DeleteRule, getAllRules, getOneRule
} = require('../controllers/Rules')
var { isAdmin  } = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllRules' ,getAllRules)
router.get('/getRule/:ruleId' ,getOneRule)
router.post('/createRule', isAdmin ,CreateRule);
router.put('/updateRule/:ruleId' ,isAdmin ,UpdateRule)
router.delete('/deleteRule/:ruleId' ,isAdmin , DeleteRule)


module.exports = router;

