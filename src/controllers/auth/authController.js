const AppError = require('../../../utils/Error');
const response = require('../../../utils/response');
const sendSms = require('../../notifications/verification_message/verification.message');
const User = require('../../database/models/userModel');
const {
   generateToken,
   existingUser,
} = require('../../../utils/helperFunctions');

async function HttpRegister(req, res, next) {
   try {
      if (await existingUser(req.body.phone, User))
         return next(
            new AppError('there is a user with the phone number', 409)
         );
      const userToken = generateToken();
      req.body.token = userToken;
      const user = await User.create(req.body);
      if (!req.body.phone)
         return next(new AppError('kindly enter a valid number', 400));
      await sendSms(req.body.phone, userToken);
      response(res, 201, user, 'token sent to phone');
   } catch (err) {
      return next(
         new AppError(`can't verify phone number, ${err.message}`, 400)
      );
   }
}

async function HttpLogin(req, res, next) {
   try {
      const user = await User.findOne({
         token: req.body.token,
         phone: req.params.phone,
      });
      if (!user) return next(new AppError('code expired or invalid', 400));
      req.session.user = user;
      response(res, 200, 'Authenticated !!');
   } catch (err) {
      return next(err);
   }
}

async function HttpCheckLoggedIn(req, res, next) {
   if (!req.session && !req.session.user) {
      return next(new AppError('verify your phone number to get started', 401));
   }
   req.user = req.session.user;
   next();
}

async function HttpUpdateUserCredentials(req, res, next) {
   try {
      const user = await User.findOneAndUpdate(req.user, req.body, {
         runValidators: false,
      });
      if (!user) return next(new AppError(`register to get started`, 401));
      response(res, 200, user);
   } catch (err) {
      return next(err);
   }
}

module.exports = {
   HttpRegister,
   HttpLogin,
   HttpUpdateUserCredentials,
   HttpCheckLoggedIn,
};
