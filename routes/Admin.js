var express = require('express');
var router = express.Router();
var User = require('../model/User')
require('dotenv').config();
const {SECRET_KEY} = process.env
var {
    authAdmin,
    registerAdmin,
    getAdminProfile,
    updateAdminProfile,
    deleteAdmin,
    getAdmins
} = require('../controllers/Admin')
var {
    isAdmin
        } = require('../middleware/authMiddleware')

  
router
  .route('/signup')
  .post(registerAdmin)

router
  .post( '/login',authAdmin)

router
  .route('/profile')
  .get( isAdmin, getAdminProfile)
  .put( isAdmin , updateAdminProfile)

router
  .route('/getAllAdmins')
  .get(getAdmins)

router
  .route('/deleteAdmin')
  .delete(isAdmin, deleteAdmin)


module.exports = router;
