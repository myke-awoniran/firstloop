const Mongoose = require('mongoose');

const commentSchema = Mongoose.Schema({
   comment: String,

   commentBy: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
   date: Date.now,
});

module.exports = Mongoose.model('Comment', commentSchema);
