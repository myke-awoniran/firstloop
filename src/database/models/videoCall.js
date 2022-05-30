const Mongoose = require('mongoose');

const VideoSchema = Mongoose.Schema(
   {
      groupCall: {
         type: Boolean,
         default: false,
      },

      duration: {
         type: Number,
         default: 0,
      },
      receiver: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'USer',
         },
      ],
      caller: {
         type: Mongoose.Schema.ObjectId,
         ref: 'USer',
         admin: true,
      },
   },
   {
      timestamps: true,
   }
);

module.exports = Mongoose.model('Video', VideoSchema);
