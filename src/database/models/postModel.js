const { Schema, model } = require('mongoose');
const postSchema = Schema(
   {
      // post schema
      post: {
         type: String,
         trim: true,
      },

      likeBy: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'User',
         },
      ],

      PostImage: [
         {
            type: String,
         },
      ],

      comments: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'User',
         },
      ],

      shareBy: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'User',
         },
      ],

      creator: {
         type: Mongoose.Schema.ObjectId,
         ref: 'User',
      },

      date: {
         type: Date,
         default: Date.now(),
      },
   },
   { autoIndex: true }
);

postSchema.pre(/^find/, async function (next) {
   this.populate({
      path: 'likeBy',
      select: 'names',
   })
      .populate({
         path: 'creator',
         select: 'names profilePic about',
      })
      .populate({
         path: 'comments',
         select: '',
      });

   next();
});

module.exports = model('Post', postSchema);
