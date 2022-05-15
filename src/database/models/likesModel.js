const Mongoose = require('mongoose');

const likeSchema = Mongoose.Schema({


   post: {
      type: Mongoose.Schema.ObjectId,
      ref: 'Post',
   },

   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model('Like', likeSchema);
