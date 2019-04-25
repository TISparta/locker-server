const mongoose = require('mongoose')

const UserSchema = new Schema({
  givenName: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('User', UserSchema)
