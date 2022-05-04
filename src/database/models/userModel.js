const Mongoose = require('mongoose');
const UserSchema = Mongoose.Schema({
   //denormalized documents
   names: {
      firstName: { type: String, trim: true, required: true },
      middleName: { type: String, trim: true, required: true },
      lastName: { type: String, trim: true, required: true },
      username: { type: String, trim: true, required: true },
   },

   //document
   phone: { type: String, unique: true },
   token: { type: String, select: false },
   joinedAt: { type: Date, default: Date.now() },
   email: { type: String, unique: true, trim: true },
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
