/** micheal
 * Awoniran */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const response = require('../../../utils/response');
const User = require('../../database/models/userModel');
const AsyncError = require('../err/Async Error/asyncError');
const AppError = require('../err/Operational Error/Operational_Error');
const { signToken, existingModel } = require('../../../utils/helperFunctions');

exports.HttpRegister = AsyncError(async (req, res, next) => {
   if (await existingModel(req.body.email, User))
      return next(new AppError('Account already exist', 400));
   await User.create(req.body);
   response(res, 201, 'Account created successfully');
});

exports.HttpLogin = AsyncError(async (req, res, next) => {
   let existingUser;
   if (!req.body.query || !req.body.password)
      return next(
         new AppError('kindly provide email/username and password', 400)
      );
   req.body.query.includes('@')
      ? (existingUser = await User.findOne(
           {
              email: req.body.query,
              active: true,
           },
           { password: true }
        ))
      : (existingUser = await User.findOne(
           {
              name: { user_name: req.body.query },
           },

           { password: 1, names: 1 }
        ));
   // console.log(existingUser);
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
   let token;
   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }
   if (!token)
      return next(
         new AppError('you are not logged in , kindly login to access', 401)
      );
   const payload = await jwt.verify(token, process.env.JWT_SECRET);
   const currentUser = await User.findOne(
      { _id: payload.id },
      { active: true, role: true }
   );
   if (!currentUser)
      return next(
         new AppError('there is no user with the provided token', 401)
      );
   req.user = currentUser;
   next();
});

exports.HttpRestrictedTo = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role))
         return next(
            new AppError('you are not allowed to perform this operation', 403)
         );
      next();
   };
};

exports.HttpForgotPassword = async (req, res, next) => {
   const user = await User.findOne({ email: req.body.email, active: true });
   if (!user)
      return next(
         new AppError('no user registered with the provided email', 400)
      );
   const randomBytes = crypto.randomBytes(32).toString('hex');
   const resetToken = crypto
      .createHash('sha256')
      .update(randomBytes)
      .digest('hex');

   user.passwordResetToken = resetToken;
   user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
   await user.save();
   try {
      console.log('token sent successfully');
   } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      user.save();
      return next(
         new AppError('An error occurred my boss, kindly try again !! ')
      );
   }
   //collect the user email
   // generate a random bytes
   //encrypt the random email
   // save a copy into the database
   // send a copy to the user email
};

exports.HttpResetPassword = AsyncError(async (req, res, next) => {
   // find the user with the params token
   // compare the token
   // if token is valid
   // change the user password
   // set the token to invalid in the database
});
