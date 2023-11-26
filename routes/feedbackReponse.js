var express = require('express');
var router = express.Router();
var {
    getfeedbackResponse,
    getfeedbackResponses,
    CreatefeedbackResponse
} = require('../controllers/feedbackResponse')
var { isAdmin , protect } = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getResponses' , getfeedbackResponses)
router.get('/getResponse/:fRId' ,getfeedbackResponse)
router.post('/CreateResponse',isAdmin,CreatefeedbackResponse);


module.exports = router;

