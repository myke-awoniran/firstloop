const { Schema, model } = require('mongoose');

const commentSchema = Schema({
   comment: String,

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
