var express = require('express');
var router = express.Router();
var User = require('../model/User')
require('dotenv').config();
const {SECRET_KEY} = process.env
var {protect  , isAdmin} = require('../middleware/authMiddleware')
var {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getSpecificProfile,
  restrictUser
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

router
  .route('/getAllUsers')
  .get(isAdmin , getUsers)

router
  .route('/getSpecificUser/:Uid')
  .get(isAdmin , getSpecificProfile)

router
  .route('/deleteUser/:UserId')
  .delete(deleteUser)

router
  .route('/restrictUser/:uid')
  .put(isAdmin , restrictUser)

module.exports = router;
