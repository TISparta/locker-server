const mongoose = require('mongoose')

const BicycleSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  color: {
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

module.exports = mongoose.model('Bicicle', BicycleSchema)
