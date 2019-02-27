const mongoose = require('mongoose')

let Schema = mongoose.Schema

let detailSchema = new Schema({
  detailId: {
    type: String,
    default: '',
    required: true,
    unique: true,
    index: true
  },
  userId: { 
    type: String, 
    required: true,
    default: '',
    index: false,
    unique: false
  },
  bloodgroup: {
    type: String,
    default: '',
    required: true
  },
  standard: {
    type: String,
    default: '',
    required: true
  },
  subject1: {
    type: String,
    default: '',
    required: true
  },
  subject2: {
    type: String,
    default: '',
    required: true
  },
  subject3: {
    type: String,
    default: '',
    required: true
  },
  subject4: {
    type: String,
    default: '',
    required: true
  },
  subject5: {
    type: String,
    default: '',
    required: true
  },
  language: {
    type: String,
    default: '',
    required: true
  },
  gender: {
    type: String,
    default: '',
    required: true
  },
  uname: {
    type: String,
    default: '',
    required: true
  },
  name: {
    type: String,
    default: '',
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

mongoose.model('Detail', detailSchema)