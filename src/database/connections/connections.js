const Mongoose = require('mongoose');

async function connectDB(string) {
   await Mongoose.connect(string);
   console.log('database connected successfully');
}
module.exports = connectDB;
