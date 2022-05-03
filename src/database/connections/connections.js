const Mongoose = require('mongoose');

async function connectDB(string) {
   await Mongoose.connect(string);
   console.log('database connect successfully');
}

module.exports = connectDB;
