var express = require('express');
var router = express.Router();
var User = require('../model/User')
require('dotenv').config();
const {SECRET_KEY} = process.env
var {protect} = require('../middleware/authMiddleware')
var {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/userController')


  
router
  .route('/signup')
  .post(registerUser)

router
  .post( '/login',authUser)

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

module.exports = router;
