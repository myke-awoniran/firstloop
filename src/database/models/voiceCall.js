const Mongoose = require('mongoose');

const AudioSchema = Mongoose.Schema(
   {
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
      },
   },
   {
      timestamps: true,
   }
);
module.exports = Mongoose.model('Video', AudioSchema);
