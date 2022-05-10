const Mongoose = require('mongoose');

const NotificationSchema = Mongoose.Schema({
   notification: String,
   Date: Date.now,
   owner: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
});

module.exports = Mongoose.model('Notification', NotificationSchema);
