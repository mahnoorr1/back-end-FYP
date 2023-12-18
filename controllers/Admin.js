var AsyncHandler = require('express-async-handler')
var generateToken = require('../utils/generateToken')
var Admin = require('../model/admin')
require('dotenv').config();
const {SECRET_KEY} = process.env


// @desc    Register a new user
// @route   POST /signup
// @access  Public
const registerAdmin = AsyncHandler(async (req, res) => {
    const { 
        firstname, 
        lastname, 
        email,
        password,
        Image,
        isApproved
        } = req.body
  
    const AdminExists = await Admin.findOne({ email })
  
    if (AdminExists) {
      res.status(400).json({
        status: 'Admin Already Exist'
      })
    }
  
    const newAdmin = await Admin.create({
        firstname, 
        lastname, 
        email,
        password,
        Image,
        isApproved 
    })
  
    if (newAdmin) {
      res.status(201).json({
        _id : newAdmin._id,
        firstname : newAdmin.firstname,
        lastname : newAdmin.lastname,
        email : newAdmin.email,
        Gender : newAdmin.Gender,
        Image : newAdmin.Image,
        isApproved : newAdmin.isApproved,
        token: generateToken(newAdmin._id),
      })
    } else {
      res.status(400)
    }
  })


// @desc    Auth user & get token
// @route   POST /login
// @access  Public
const authAdmin = AsyncHandler(
  async(req,res,next)=>{
    const {email, password} = req.body
    const userExist = await Admin.findOne({email})
    if(!userExist){
      return res.status(401).json({ message: 'Incorrect email' });
    }
    else{
        if(await userExist.matchPassword(password)){
          console.log('Im valid')
            res.json({
              status : 200,
                _id : userExist._id,
                Firstname : userExist.Firstname,
                Lastname : userExist.Lastname,
                profilePic : userExist.profilePic,
                email : userExist.email,
                isApproved : userExist.isApproved,
                //token generate
                token : generateToken(userExist._id)
            })
        }
        else{
          console.log('Im invalid')

          return res.status(401).json({ message: 'Incorrect password' }); 
          
        
        }
    }
}
  )


// @desc    Get user profile
// @route   GET /profile
// @access  Private
const getAdminProfile = AsyncHandler(async (req, res) => {
  const getAdmin = await Admin.findById(req.admin._id)

  if (getAdmin) {
    
    res.json({
        _id : getAdmin._id,
        firstname : getAdmin.firstname,
        lastname : getAdmin.lastname,
        email : getAdmin.email,
        Gender : getAdmin.Gender,
        Image : getAdmin.Image,
        isApproved : getAdmin.isApproved
      })
  } else {
    res.status(404)
    throw new Error('Admin not found')
  }
})


// @desc    Update user profile
// @route   PUT /profile
// @access  Private
const updateAdminProfile = AsyncHandler(async (req, res) => {
    const getAdmin = await Admin.findById(req.admin._id)
  
    if (getAdmin) {
      
        getAdmin.firstname = req.body.firstname || getAdmin.firstname
        getAdmin.lastname = req.body.lastname || getAdmin.lastname
        getAdmin.email = req.body.email || getAdmin.email
        getAdmin.Image = req.body.Image || getAdmin.Image
        
      const updatedUser = await getAdmin.save()
  
      res.json({
        _id : updatedUser._id,
        firstname : updatedUser.firstname,
        lastname : updatedUser.lastname,
        email : updatedUser.email,
        Image : updatedUser.Image,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404)
      throw new Error('Admin not found')
    }
  })



const deleteAdmin = AsyncHandler(async (req, res) => {

  const getAdmin = await Admin.findByIdAndDelete(req.admin._id);

  if (getAdmin) {

    return res.status(204).send();
  } else {
    res.status(404)
    throw new Error('Admin not found')
  }
})


const getAdmins = AsyncHandler(async (req, res) => {
    const user = await Admin.find()
  
    if (user) {
      
      res.send(user)
    } else {
      res.status(404)
      throw new Error('Admins not found')
    }
  })


module.exports = {
    authAdmin,
    registerAdmin,
    getAdminProfile,
    updateAdminProfile,
    deleteAdmin,
    getAdmins
  }