const { Schema, model } = require('mongoose');

const NotificationSchema = Schema({
   notification: String,
   Date: Date.now,
   owner: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
});

module.exports = model('Notification', NotificationSchema);
