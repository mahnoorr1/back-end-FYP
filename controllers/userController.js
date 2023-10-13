var AsyncHandler = require('express-async-handler')
var generateToken = require('../utils/generateToken')
var User = require('../model/User')
require('dotenv').config();
const {SECRET_KEY} = process.env


// @desc    Register a new user
// @route   POST /signup
// @access  Public
const registerUser = AsyncHandler(async (req, res) => {
    const { 
      firstname, 
      lastname, 
        email,
        password,
        Image,
        phoneNumber,
        SubscriptionStatus 
        } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400).json({
        status: 'User Already Exist'
      })
    }
  
    const user = await User.create({
        firstname, 
        lastname, 
        email,
        password,
        Image,
        phoneNumber,
        SubscriptionStatus  
    })
  
    if (user) {
      res.status(201).json({
        _id : user._id,
        Firstname : user.Firstname,
        Lastname : user.Lastname,
        email : user.email,
        Gender : user.Gender,
        Image : user.Image,
        PhoneNumber : user.PhoneNumber,
        Subscription : user.Subscription,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
    }
  })


// @desc    Auth user & get token
// @route   POST /login
// @access  Public
const authUser = AsyncHandler(
  async(req,res,next)=>{
    const {email, password} = req.body
    const userExist = await User.findOne({email})
    if(!userExist){
      res.json({
        status : 401,
        error : "Invalid Email"
      })
    }
    else{
        if(await userExist.matchPassword(password)){
            res.json({
                _id : userExist._id,
                fullName : userExist.fullName,
                phoneNum : userExist.phoneNum,
                profilePic : userExist.profilePic,
                email : userExist.email,
                //token generate
                token : generateToken(userExist._id)
            })
        }
        else{
          res.json({
            status : 401,
            error : "Invalid Password"
          })  
          
        
        }
    }
}
  )


// @desc    Get user profile
// @route   GET /profile
// @access  Private
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    
    res.json({
        _id : user._id,
        Firstname : user.Firstname,
        Lastname : user.Lastname,
        email : user.email,
        Gender : user.Gender,
        Image : user.Image,
        PhoneNumber : user.PhoneNumber,
        Subscription : user.Subscription,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const getSpecificProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.Uid)

  try {
    if (user) {
    
      res.json({
          _id : user._id,
          Firstname : user.Firstname,
          Lastname : user.Lastname,
          email : user.email,
          Gender : user.Gender,
          Image : user.Image,
          PhoneNumber : user.PhoneNumber,
          Subscription : user.Subscription,
      })
    } else {
      res.status(404).json({message : 'User not found'})
    }
  } catch (err) {
      console.error(err)
  }
  
})


// @desc    Update user profile
// @route   PUT /profile
// @access  Private
const updateUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      
      user.Firstname = req.body.Firstname || user.Firstname
      user.Lastname = req.body.Lastname || user.Lastname
      user.email = req.body.email || user.email
      user.Gender = req.body.Gender || user.Gender
      user.Image = req.body.Image || user.Image
      user.PhoneNumber = req.body.PhoneNumber || user.PhoneNumber
        
      const updatedUser = await user.save()
  
      res.json({
        _id : updatedUser._id,
        Firstname : updatedUser.Firstname,
        Lastname : updatedUser.Lastname,
        email : updatedUser.email,
        Gender : updatedUser.Gender,
        Image : updatedUser.Image,
        PhoneNumber : updatedUser.PhoneNumber,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })


const getUsers = AsyncHandler(async (req, res) => {
  const user = await User.find()

  if (user) {
    
    res.send(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


const deleteUser = AsyncHandler(async (req, res) => {
  const id = req.params.UserId
  const user = await User.findByIdAndDelete(id);

  if (user) {

    return res.status(204).send();
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getSpecificProfile
  }