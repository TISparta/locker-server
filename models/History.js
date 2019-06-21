const mongoose = require('mongoose')
const { Schema } = mongoose

const HistorySchema = new Schema({
  code: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    default: ""
  },
  start: {
    type: Date,
    default: Date.now
  },
  finish: {
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
  },
  lat_to: {
    type: String,
    default: ""
  },
  lng_to: {
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

module.exports = mongoose.model('History', HistorySchema)
