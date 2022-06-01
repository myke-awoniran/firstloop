"use strict";

var Mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var UserSchema = Mongoose.Schema({
  names: {
    first_name: {
      type: String,
      trim: true,
      required: [true, 'your first name']
    },
    middle_name: {
      type: String,
      required: [true, 'your middle name'],
      trim: true
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, 'your last name']
    },
    user_name: {
      type: String,
      trim: true,
      required: [true, 'your username'],
      unique: true
    }
  },
  googleId: {
    type: String,
    select: false
  },
  // profile document
  phone: {
    type: String
  },
  about: {
    type: String
  },
  joinedAt: {
    type: Date,
    "default": Date.now()
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'your email address'],
    unique: true
  },
  verified: {
    type: Boolean,
    "default": false
  },
  profilePic: {
    type: String,
    "default": 'avatar.jpg'
  },
  coverPhoto: {
    type: String
  },
  location: {
    type: String
  },
  password: {
    type: String,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetTokenExpires: {
    type: String,
    select: false
  },
  //documents with that takes Boolean
  active: {
    type: Boolean,
    "default": true
  },
  role: {
    type: String,
    "enum": ['user', 'admin'],
    select: false,
    "default": 'user'
  },
  friends: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'users',
    is_a_Friend: {
      type: Boolean,
      "default": true
    }
  }],
  notifications: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'notifications'
  }],
  calls: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'calls'
  }],
  posts: [{
    type: Mongoose.Schema.ObjectId,
    ref: 'Post'
  }],
  gender: {
    type: String,
    "enum": ['male', 'female']
  },
  videoCalls: [{
    type: Mongoose.Schema.ObjectId,
    select: false,
    ref: 'Video'
  }],
  voiceCalls: [{
    type: Mongoose.Schema.ObjectId,
    select: false,
    ref: 'Audio'
  }]
}, {
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
UserSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified('password')) {
            _context.next = 5;
            break;
          }

          this.passwordConfirm = undefined;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 10));

        case 4:
          this.password = _context.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

UserSchema.methods.comparePassword = function _callee2(userPassword, OriginalPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(bcrypt.compare(userPassword, OriginalPassword));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = Mongoose.model('User', UserSchema);