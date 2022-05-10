/** micheal
 * Awoniran */

const passport = require('passport');
const User = require('../../database/models/userModel');
const AsyncError = require('../err/Async Error/asyncError');
const AppError = require('../err/Operational Error/Operational_Error');
const { existingUser, signToken } = require('../../../utils/helperFunctions');
const response = require('../../../utils/response');

exports.HttpRegister = AsyncError(async (req, res, next) => {
   const user = await User.create(req.body);
   response(res, 201, user);
});

exports.HttpLogin = AsyncError(async (req, res, next) => {
   let existingUser;
   if (!req.body.query || !req.body.password)
      return next(
         new AppError('kindly provide email/username and password', 400)
      );
   req.body.query.includes('@')
      ? (existingUser = await User.findOne(
           { email: req.body.query },
           { password: 1 }
        ))
      : (existingUser = await User.findOne({
           name: { username: req.body.query },
        }));
   if (
      !existingUser ||
      !(await existingUser.comparePassword(
         req.body.password,
         existingUser.password
      ))
   )
      return next(new AppError(`opps, invalid username or password`, 401));
   response(res, 200, 'login successful!', await signToken(existingUser._id));
});

exports.HttpCheckLoggedIn = AsyncError(async (req, res, next) => {});

exports.HttpUpdateUserCredentials = AsyncError(async (req, res, next) => {
   const user = await User.findOneAndUpdate(req.user, req.body, {
      runValidators: true,
   });
   if (!user) return next(new AppError(`register to get started`, 401));
   response(res, 200, user);
});

//  function permissionTo(roles)=(req,res,next)
