const mongoose = require('mongoose')
const { Schema } = mongoose

const LocationsSchema = new Schema({
  bicycle: {
    type: Schema.Types.ObjectId,
    required: true
  },
  location: {
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

module.exports = mongoose.model('Locations', LocationsSchema)
