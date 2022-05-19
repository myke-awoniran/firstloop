const Mongoose = require('mongoose');

const FriendsSchema = Mongoose.Schema({
   user: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
});

module.exports = Mongoose.Schema('Friends', FriendsSchema);
