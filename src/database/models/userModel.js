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
         },
         last_name: {
            type: String,
            trim: true,
         },
         user_name: {
            type: String,
            trim: true,
            unique: [true, 'username already exist'],
         },
      },

      googleId: {
         type: String,
         select: false,
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
         select: false,
      },

      profilePic: {
         type: String,
         default: 'avatar.jpg',
      },
      coverPhoto: {
         type: String,
      },

      passwordResetToken: {
         type: String,
         select: false,
      },

      passwordResetTokenExpires: {
         type: String,
         select: false,
      },

      //documents with that takes Boolean
      active: {
         type: Boolean,
         default: true,
      },
      role: {
         type: String,
         enum: ['user', 'admin'],
         select: false,
         default: 'user',
      },

      verified: {
         type: Boolean,
         default: false,
         select: false,
      },

      groupAdmin: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'Groups',
            admin: {
               Boolean,
               default: true,
            },
         },
      ],

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
      calls: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'calls',
         },
      ],
      posts: [
         {
            type: Mongoose.Schema.ObjectId,
            ref: 'Post',
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

// UserSchema.index({ name: 1, chats: 1, comments: 1 });

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
