const mongoose = require('mongoose')
const { Schema } = mongoose

const BicycleSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  ext: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  currentUser: {
    type: String,
    default: ""
  },
  start: {
    type: Date,
    default: Date.now
  },
  lat_from: {
    type: String,
    default: ""
  },
  lng_from: {
    type: String,
    default: ""
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

module.exports = mongoose.model('Bicycle', BicycleSchema)
