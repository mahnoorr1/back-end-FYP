var jwt = require('jsonwebtoken')
require('dotenv').config();
const {SECRET_KEY} = process.env

var asyncHandler = require('express-async-handler')
var User = require('../model/User')
var Admin = require('../model/admin')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, SECRET_KEY)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({message : 'Not authorized, token failed' } )
    }
  }

  if (!token) {
    res.status(401).json({message : 'Not authorized, no token' } )
  }
})


const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, SECRET_KEY);

      // Check if the user is in the "Users" collection
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
        next();
        return; // Exit the middleware if the user is in the "Users" collection
      }

      // Check if the user is in the "Admin" collection
      const admin = await Admin.findById(decoded.id).select('-password');
      if (admin) {
        req.user = admin;
        next();
        return; // Exit the middleware if the user is in the "Admin" collection
      }

      // If neither "Users" nor "Admin" found, return unauthorized
      res.status(401).json({ message: 'Not authorized, user not found' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});


const isAdmin = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, SECRET_KEY)

      req.admin = await Admin.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      return res.status(401).json({message : 'Not authorized, token failed'})
   
    }
  }

  if (!token) {
    return res.status(401).json({message : 'Not authorized, no token'})
  }
})

module.exports = { protect , isAdmin , isLoggedIn}