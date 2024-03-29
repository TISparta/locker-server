const mongoose = require('mongoose')
const { Schema } = mongoose

const LocationsSchema = new Schema({
  bicycle: {
    type: Schema.Types.ObjectId,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    default: ""
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('Locations', LocationsSchema)
