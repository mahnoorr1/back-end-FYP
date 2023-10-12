var express = require('express');
var router = express.Router();
var {
    Construction
} = require('../controllers/Buildings')


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getReportOfConstruction', Construction);


module.exports = router;

