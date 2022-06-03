const Mongoose = require('mongoose');

const postSchema = Mongoose.Schema(
   {
      post: {
         type: String,
         trim: true,
      },

      likeBy: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'User',
            liked: {
               type: Boolean,
               default: false,
            },
         },
      ],

      PostImage: {
         type: String,
      },

      comments: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'Comment',
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
   {
      autoIndex: true,

      toObject: {
         virtuals: true,
      },

      toJSON: {
         virtuals: true,
      },
   }
);

// postSchema.virtual('number_of_likes').get(function () {
//    return this.likeBy.length;
// });

// postSchema.virtual('number_of_comments').get(function () {
//    return this.comments.length;
// });

postSchema.pre(/^find/, async function (next) {
   this.populate({
      path: 'likeBy',
      select: 'names',
   }).populate({
      path: 'creator',
      select: 'names profilePic about',
   });
});
// .populate('comments');

//    next();
// });

module.exports = Mongoose.model('Post', postSchema);
