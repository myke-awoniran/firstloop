/** micheal
 * Awoniran */
const jwt = require('jsonwebtoken');
const User = require('../../database/models/userModel');
const AsyncError = require('../err/Async Error/asyncError');
const AppError = require('../err/Operational Error/Operational_Error');
const { signToken, existingModel } = require('../../../utils/helperFunctions');
const response = require('../../../utils/response');

exports.HttpRegister = AsyncError(async (req, res, next) => {
   if (await existingModel(req.body.email, User))
      return next(new AppError('Account already exist', 400));
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
           { email: req.body.query, active: true },
           { password: 1 }
        ))
      : (existingUser = await User.findOne({
           name: { username: req.body.query, active: true },
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

exports.HttpCheckLoggedIn = AsyncError(async (req, res, next) => {
   let token = undefined;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }
   // console.log(token);
   if (!token)
      return next(
         new AppError('you are not logged in , kindly login to access', 401)
      );
   const payload = await jwt.verify(token, process.env.JWT_SECRET);
   const currentUser = await User.findById(payload.id);
   if (!currentUser)
      return next(
         new AppError('there is no user with the provided token', 401)
      );
   req.user = currentUser;
   next();
});

//  function permissionTo(roles)=(req,res,next)
