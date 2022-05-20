// for one on one messages
const Mongoose = require('mongoose');

const messageSchema = Mongoose.Schema(
   {
      sender: {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },
      content: {
         type: String,
         trim: true,
      },
      read: {
         type: Boolean,
         default: false,
      },

      chat: {
         type: Mongoose.Schema.ObjectId,
         ref: 'Chat',
      },

      receiver: {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },
   },

   { timestamps: true }
);
module.exports = Mongoose.model('Message', messageSchema);
