const Mongoose = require('mongoose');
const UserSchema = Mongoose.Schema({
   //denormalized documents
   names: {
      first_name: { type: String, trim: true },
      middle_name: { type: String, trim: true },
      last_name: { type: String, trim: true },
      user_name: { type: String, trim: true, unique: true },
   },

   //document
   phone: { type: String, unique: true },
   token: { type: String, select: false },
   joinedAt: { type: Date, default: Date.now() },
   email: { type: String, trim: true },
   profilePic: { type: String, default: 'avatar.jpg' },

   //documents with that takes Boolean
   active: { type: Boolean, default: true },
   verified: { type: Boolean, default: false, select: false },

   //normalized collections
   chats: { type: Mongoose.Schema.ObjectId, ref: 'chats' },
   likes: { type: Mongoose.Schema.ObjectId, ref: 'likes' },
   followers: { type: Mongoose.Schema.ObjectId, ref: 'followers' },
   notifications: { type: Mongoose.Schema.ObjectId, ref: 'notifications' },
});

module.exports = Mongoose.model('User', UserSchema);
