const Mongoose = require('mongoose');

const chatSchema = Mongoose.Schema({
   chat: {
      type: String,
      trim: true,
   },

   isGroupChat: {
      type: Boolean,
      default: false,
   },
   users: [
      {
         type: Mongoose.Schema.ObjectId,
         ref: 'Users',
      },
   ],

   latestMessage: {
      type: Mongoose.ObjectId.Schema,
      ref: 'Message',
   },
});

module.exports = Mongoose.model('Chat', chatSchema);
