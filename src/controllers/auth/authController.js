/** micheal
 * Awoniran */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Email = require('../../email/email');
const response = require('../../../utils/response');
const User = require('../../database/models/userModel');
const AsyncError = require('../err/Async Error/asyncError');
const AppError = require('../err/Operational Error/Operational_Error');
const { signToken, existingModel } = require('../../../utils/helperFunctions');

exports.HttpRegister = AsyncError(async (req, res, next) => {
   const user = await User.create(req.body);
   await new Email(user, undefined).sendWelcome();
   response(res, 201, 'Account created successfully');
});

exports.HttpLogin = AsyncError(async (req, res, next) => {
   let existingUser;
   if (!req.body.query || !req.body.password)
      return next(
         new AppError('kindly provide email/username and password', 400)
      );
   existingUser = req.body.query.includes('@')
      ? (existingUser = await User.findOne(
           {
              email: req.body.query,
              active: true,
           },
           { password: true }
        ))
      : (existingUser = await User.findOne(
           {
              'names.user_name': `${req.body.query}`,
              active: true,
           },
           { password: 1 }
        ));
   if (
      !existingUser ||
      !(await existingUser.comparePassword(
         req.body.password,
         existingUser.password
      ))
   )
      return next(new AppError(`opps!!!, invalid username or password`, 401));
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
      {
         active: true,
         role: true,
         posts: true,
         names: true,
         chats: true,
         about: true,
         friends: true,
      }
   );
   if (!currentUser)
      return next(
         new AppError('there is no user with the provided token', 401)
      );
   req.user = currentUser;
   next();
});

exports.HttpRestrictedTo =
   (...roles) =>
   (req, res, next) => {
      if (!roles.includes(req.user.role))
         return next(
            new AppError('you are not allowed to perform this operation', 403)
         );
      next();
   };

exports.HttpForgotPassword = async (req, res, next) => {
   const user = await existingModel(req.body.email, User);
   if (!user) return next(new AppError('Account does not exist', 400));
   const randomBytes = crypto.randomBytes(32).toString('hex');
   const resetToken = crypto
      .createHash('sha256')
      .update(randomBytes)
      .digest('hex');
   user.passwordResetToken = resetToken;
   user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
   await user.save();
   try {
      const resetURL = `http://localhost:3000/api/v1/reset-password/${randomBytes}`;
      await new Email(user, resetURL).sendPasswordReset();
      response(res, 200, 'token sent to email');
   } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      user.save();
      return next(
         new AppError(
            'An error occurred while sending the email my boss, kindly consider trying again !! '
         )
      );
   }
};

exports.HttpResetPassword = AsyncError(async (req, res, next) => {
   const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
   const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
   });
   if (!user) return next(new AppError('token expired or invalid', 400));
   if (req.body.password !== req.body.passwordConfirm)
      return next(new AppError('password not match', 400));
   user.password = req.body.password;
   user.passwordResetToken = undefined;
   user.passwordResetTokenExpires = undefined;
   await user.save();
   response(res, 200, 'reset successful');
});
