const mongoose = require('mongoose')

let Schema = mongoose.Schema

let userSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  userId: {
    required: true,
    unique: false,
    index: false,
    default: '',
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default: 'password'
  },
  confirmPassword: {
    type: String,
    required: true,
    default: 'password'
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('User', userSchema)