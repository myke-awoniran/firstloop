const Mongoose = require('mongoose');

const NotificationSchema = Mongoose.Schema({
   notification: {
      type: String,
      enum: ['Video', 'Audio', 'Like', 'Posts', 'Comment'],
   },
   Date: Date.now,
   user: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
});

module.exports = Mongoose.model('Notification', NotificationSchema);
