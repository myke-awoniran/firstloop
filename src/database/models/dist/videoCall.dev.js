"use strict";

var Mongoose = require('mongoose');

var VideoSchema = Mongoose.Schema({
  groupCall: {
    type: Boolean,
    "default": false
  },
  duration: {
    type: Number,
    "default": 0
  },
  receiver: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'USer'
  }],
  caller: {
    type: Mongoose.Schema.ObjectId,
    ref: 'USer',
    admin: true
  }
}, {
  timestamps: true
});
module.exports = Mongoose.model('Video', VideoSchema);