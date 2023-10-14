var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
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
    gender: {
      type: String,
    },
    image: {
      type: String
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    SubscriptionStatus: {
      type: Boolean,
      default: false,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
    status: {
      type: Boolean, //if false means restricted
      default: true,
    },
    restrictedTill: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
)

//Password decrypting and encrypting
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)

module.exports =  User
