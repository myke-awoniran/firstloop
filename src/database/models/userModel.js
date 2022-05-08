const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Mongoose.Schema(
   {
      names: {
         first_name: {
            type: String,
            trim: true,
         },
         middle_name: {
            type: String,
            trim: true,
            required: [true, 'kindly input your name'],
         },
         last_name: {
            type: String,
            trim: true,
            required: [true, 'kindly input your name'],
         },
         user_name: {
            type: String,
            trim: true,
            unique: [true, 'user already exist'],
         },
      },

      // private document

      phone: {
         type: String,
      },

      about: {
         type: String,
      },

      joinedAt: {
         type: Date,
         default: Date.now(),
      },

      email: {
         type: String,
         trim: true,
         unique: true,
      },
      password: {
         type: String,
      },

      profilePic: {
         type: String,
         default: 'avatar.jpg',
      },

      passwordResetToken: {
         type: String,
         select: false,
      },

      passwordResetTOkenExpires: {
         type: String,
         select: false,
      },

      //documents with that takes Boolean
      active: {
         type: Boolean,
         default: true,
      },

      verified: {
         type: Boolean,
         default: false,
         select: false,
      },

      //normalized collections

      chats: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'chats',
         },
      ],

      likes: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'likes',
         },
      ],

      friends: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'users',
         },
      ],

      notifications: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'notifications',
         },
      ],

      comments: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'replies',
         },
      ],

      gender: {
         type: String,
         enum: ['male', 'female'],
      },

      location: {
         type: String,
      },
   },

   { timestamps: true }
);

UserSchema.index({ name: 1, notifications: 1, chats: 1 });

UserSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      this.passwordConfirm = undefined;
      this.password = await bcrypt.hash(this.password, 10);
   }
   next();
});

UserSchema.methods.comparePassword = async function (
   userPassword,
   OriginalPassword
) {
   return await bcrypt.compare(userPassword, OriginalPassword);
};

module.exports = Mongoose.model('User', UserSchema);
