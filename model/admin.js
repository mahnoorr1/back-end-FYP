var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const adminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Image: {
      type: String
    },
    isApproved:{
      type : Boolean,
      default : false
    }
  },
  {
    timestamps: true,
  }
)

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


const Admin = mongoose.model('Admin', adminSchema)

module.exports =  Admin;
