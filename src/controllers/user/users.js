const User = require('../../database/models/userModel');
const AsyncError = require('../../controllers/err/Async Error/asyncError');
const response = require('../../../utils/response');
const AppError = require('../../controllers/err/Operational Error/Operational_Error');

const selectOptions = {
   chats: 0,
   call: 0,
   __v: 0,
   active: 0,
   password: 0,
   notifications: 0,
};

exports.HttpUpdateUserCredentials = AsyncError(async (req, res, next) => {
   const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      runValidators: true,
   });
   if (!user) return next(new AppError(`register to get started`, 401));
   response(res, 200, user);
});

exports.HttpGetUser = AsyncError(async (req, res, next) => {
   const loggedInUser = await User.findOne(req.user._id, selectOptions);
   response(res, 200, loggedInUser);
});

exports.HttpDeleteAccount = AsyncError(async (req, res, next) => {
   const loggedInUser = await User.findByIdAndUpdate(req.user.id, {
      active: false,
   });
   response(res, 200, 'account deleted !!');
});
