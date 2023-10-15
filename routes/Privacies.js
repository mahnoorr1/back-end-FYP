var express = require('express');
var router = express.Router();
var {
    getPrivacyPolicy , UpdatePolicies
} = require('../controllers/Policies')
var { protect , isAdmin } = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getPrivacyPolicy' ,getPrivacyPolicy)
router.put('/updatePolicies/:policyId' ,isAdmin ,UpdatePolicies)


module.exports = router;

