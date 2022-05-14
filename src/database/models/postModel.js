const Mongoose = require('mongoose');
const postSchema = Mongoose.Schema({
   // post schema
   post: {
      type: String,
      trim: true,
   },

   likeBy: [
      {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },
   ],

   PostImage: [
      {
         type: String,
      },
   ],

   comments: [
      {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },
   ],

   shareBy: [
      {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },
   ],

   creator: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },

   date: {
      type: Date,
      default: Date.now(),
   },
});

module.exports = Mongoose.model('Post', postSchema);
