async function connectDB(mongoose, string) {
   await mongoose.connect(string);
   console.log('database connected successfully');
}
module.exports = connectDB;
