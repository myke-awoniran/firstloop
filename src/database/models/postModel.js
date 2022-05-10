const Mongoose = require('mongoose');

const postSchema = Mongoose.Schema({
   post: String,
   likeBy: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
   date: Date.now,
});

module.exports = Mongoose.model('Comment', postSchema);
