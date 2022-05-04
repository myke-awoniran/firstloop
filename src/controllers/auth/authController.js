const Error = require('../../../utils/Error');
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
         return next(new Error('there is a user with the phone number', 409));
      const userToken = generateToken();
      req.token = userToken;
      const user = await User.create(req.body);
      if (!req.body.phone)
         return next(new Error('kindly enter a valid number', 400));
      await sendSms(req.body.phone, userToken);
      response(res, 201, user, 'token sent to phone');
   } catch (err) {
      return next(new Error(`can't verify phone number, ${err.message}`, 400));
   }
}

async function HttpLogin(req, res, next) {
   try {
      const user = await User.findOne({
         token: req.body.token,
         phone: req.body.phone,
      });
      if (!user) return next(new Error('code expired or invalid', 400));
      response(res, 200, 'Authenticated !!');
   } catch (err) {
      return next(
         new Error(`cant verify token, kindly try again ${err.message}`, 400)
      );
   }
}

async function HttpUpdateUserCredentials(req, res, next) {
   try {
      const user = await User.findOneAndUpdate(req.params.id, req.body, {
         runValidators: true,
      });
      response(res, 200, user);
   } catch (err) {
      console.log(err);
      return next(
         new Error('Error updating credentials, kindly try again later!', 400)
      );
   }
}

module.exports = {
   HttpRegister,
   HttpLogin,
   HttpUpdateUserCredentials,
};
