const { Schema, model, Mongoose } = require('mongoose');

const commentSchema = Schema({
   //
   comment: {
      type: String,
      trim: true,
   },
   postId: {
      type: Mongoose.Schema.ObjectId,
      ref: 'Post',
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

module.exports = model('Comment', commentSchema);
