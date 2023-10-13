var express = require('express');
var router = express.Router();
var {
    Construction
} = require('../controllers/Buildings')
var {
  isAdmin
} = require('../middleware/authMiddleware')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getReportOfConstruction',isAdmin, Construction);


module.exports = router;

