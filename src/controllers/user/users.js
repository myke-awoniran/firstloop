const User = require('../../database/models/userModel');
const AsyncError = require('../err/Async Error/asyncError');
const response = require('../../../utils/response');
const Post = require('../../database/models/postModel');
const AppError = require('../err/Operational Error/Operational_Error');
const { dumpPost, dumbUser } = require('../../../utils/dump');

exports.HttpUpdateUserCredentials = AsyncError(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      runValidators: true,
   });
   if (!user) return next(new AppError(`register to get started`, 401));
   response(res, 200, dumbUser(user));
});

exports.HttpGetUser = AsyncError(async (req, res, next) => {
   const loggedInUser = await User.findById(req.user._id);
   response(res, 200, dumbUser(loggedInUser));
});

exports.HttpDeleteAccount = AsyncError(async (req, res, next) => {
   await User.findByIdAndUpdate(req.user.id, {
      active: false,
   });
   response(res, 200, 'account deleted !!');
});

exports.HttpGetAllUsers = AsyncError(async (req, res, next) => {
   let users = await User.find({ active: true });
   users = users.map((el) => dumbUser(el));
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
   response(res, 200, dumbUser(user));
});

// get personal information

exports.HttpGetUserPosts = AsyncError(async (req, res, next) => {
   let userPosts = await Post.find({ creator: req.user.id }).sort('-date');
   userPosts = userPosts.map((el) => dumpPost(el));
   response(res, 200, userPosts);
});

exports.HttpAddFriend = AsyncError(async (req, res, next) => {
   req.user.friends.push(req.params.userId);
   await req.user.save();
   response(res, 200, 'friend request sent');
});

exports.HttpUnfriendUser = AsyncError(async (req, res, next) => {
   //
});

exports.HttpMyFriends = AsyncError(async (req, res, next) => {
   const friends = await User.findById(req.user.id, {
      friends: true,
   });
   response(res, 200, friends);
});

exports.HttpSearchUser = AsyncError(async (req, res, next) => {
   const users = await User.find({ search: req.query.users });
   console.log(users);
   // const users = await User.aggregate([
   //    {
   //       $search: {
   //          text: {
   //             query: req.query.users,
   //             path: ['names', 'about'],
   //          },
   //       },
   //    },
   //    {
   //       $limit: 5,
   //    },
   //    {
   //       $project: {
   //          _id: 0,
   //          name: 1,
   //          about: 1,
   //       },
   //    },
   // ]);
   response(res, 200, users);
});
