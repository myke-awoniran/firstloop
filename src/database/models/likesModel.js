const { Schema, model } = require('mongoose');

const likeSchema = Schema({
   post: {
      type: Mongoose.Schema.ObjectId,
      ref: 'Post',
   },

   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = model('Like', likeSchema);
