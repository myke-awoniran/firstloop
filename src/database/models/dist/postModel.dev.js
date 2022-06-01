"use strict";

var Mongoose = require('mongoose');

var postSchema = Mongoose.Schema({
  post: {
    type: String,
    trim: true
  },
  likeBy: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  PostImage: {
    type: String
  },
  comments: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'Comment',
    select: false
  }],
  creator: {
    type: Mongoose.Schema.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    "default": Date.now()
  }
}, {
  autoIndex: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
}); // postSchema.virtual('number_of_likes').get(function () {
//    return this.likeBy.length;
// });
// postSchema.virtual('number_of_comments').get(function () {
//    return this.comments.length;
// });

postSchema.pre(/^find/, function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.populate({
            path: 'likeBy',
            select: 'names'
          }).populate({
            path: 'creator',
            select: 'names profilePic about'
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // .populate('comments');
//    next();
// });

module.exports = Mongoose.model('Post', postSchema);