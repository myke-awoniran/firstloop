const User = require('../../database/models/userModel');
const AsyncError = require('../../controllers/err/Async Error/asyncError');
const response = require('../../../utils/response');
const Post = require('../../database/models/postModel');
const AppError = require('../../controllers/err/Operational Error/Operational_Error');

const selectOptions = {
   chats: 0,
   calls: 0,
   __v: 0,
   active: 0,
   password: 0,
   notifications: 0,
   comments: 0,
   posts: 0,
   likes: 0,
};

exports.HttpUpdateUserCredentials = AsyncError(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      runValidators: true,
   });
   if (!user) return next(new AppError(`register to get started`, 401));
   response(res, 200, user);
});

exports.HttpGetUser = AsyncError(async (req, res, next) => {
   const loggedInUser = await User.findById(req.user._id, selectOptions);
   response(res, 200, loggedInUser);
});

exports.HttpDeleteAccount = AsyncError(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user.id, {
      active: false,
   });
   response(res, 200, 'account deleted !!');
});

exports.HttpGetAllUsers = AsyncError(async (req, res, next) => {
   const users = await User.find({ active: true }, selectOptions);
   response(res, 200, users);
});

exports.HttpRemoveUser = AsyncError(async (req, res, next) => {
   const user = await User.findByIdAndDelete(req.params.id);
   if (!user)
      return next(new AppError('cannot find any user with the id', 404));
   response(res, 200, 'user deleted successful');
});

exports.HttpGetUserByID = AsyncError(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (!user)
      return next(new AppError('there is no user with the provided Id', 404));
   response(res, 200, user);
});

// get personal information

exports.HttpGetUserPosts = AsyncError(async (req, res, next) => {
   const userPosts = await Post.find({ creator: req.user.id }).sort('-date');
   response(res, 200, userPosts);
});

exports.HttpAddFriend = AsyncError(async (req, res, next) => {
   req.user.friends.push(req.params.userId);
   await req.user.save();
   response(res, 200, 'friend request sent');
});

exports.HttpUnfriendUser = AsyncError(async (req, res, next) => {
   req.user.friends.
});

exports.HttpMyFriends = AsyncError(async (req, res, next) => {});
