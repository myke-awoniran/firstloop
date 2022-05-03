const Mongoose = require('mongoose');
const UserSchema = Mongoose.Schema({
   names: {
      firstName: {
         type: String,
      },
      LastName: {
         type: String,
      },
      MiddleName: {
         type: String,
      },
   },
   chats: {
      type: Mongoose.Schema.ObjectId,
      ref: 'chats',
   },
   likes: {
      type: Mongoose.Schema.ObjectId,
      ref: 'likes',
   },
   followers: {
      type: Mongoose.Schema.ObjectId,
      ref: 'followers',
   },
   profilePic: {
      type: String,
      default: 'avatar.jpg',
   },
   phone: {
      type: String,
      unique: true,
   },

   verified: {
      type: Boolean,
      default: false,
      select: false,
   },

   token: {
      type: String,
      select: false,
   },
   joinedAt: {
      type: Date,
      default: Date.now(),
   },
   active: {
      type: Boolean,
      default: true,
   },
});

module.exports = Mongoose.model('User', UserSchema);
