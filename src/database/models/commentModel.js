const Mongoose = require('mongoose');

const commentSchema = Mongoose.Schema({
   comment: {
      type: String,
      trim: true,
   },

   commentBy: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
   },
   postId: {
      type: Mongoose.Schema.ObjectId,
      ref: 'Post',
   },

   date: {
      type: Date,
      default: Date.now,
   },
});

commentSchema.post(/^save/, async (doc) => {
   doc.populate({
      path: 'commentBy',
      select: 'names about profilePic',
   });
});

commentSchema.pre('find', async function (next) {
   this.populate({
      path: 'commentBy',
      select: 'names about profilePic',
   });
});

module.exports = Mongoose.model('Comment', commentSchema);
