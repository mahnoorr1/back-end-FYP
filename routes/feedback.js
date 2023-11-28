var express = require('express');
var router = express.Router();
var {
    getfeedbacks,
    getfeedback,
    CreateFeedback
} = require('../controllers/feedbackController')
var { isAdmin , protect , isLoggedIn } = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getfeedbacks' , getfeedbacks)
router.get('/getfeedback/:feedbackId' ,getfeedback)
router.post('/createfeedback',isLoggedIn,CreateFeedback);


module.exports = router;

