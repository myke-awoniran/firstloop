const Mongoose = require('mongoose');

const commentSchema = Mongoose.Schema({
   comment: {
      type: String,
      trim: true,
   },

   commentBy: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },

   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model('Comment', commentSchema);
