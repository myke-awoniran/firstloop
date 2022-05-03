const Error = require('../../../utils/Error');
const response = require('../../../utils/response');
const sendSms = require('../../notifications/verification_message/verification.message');
const User = require('../../database/models/userModel');
const {
   generateToken,
   createHash,
   //    verify,
   existingUser,
} = require('../../../utils/helperFunctions');
const {
   UsageRecordInstance,
} = require('twilio/lib/rest/supersim/v1/usageRecord');
const { verify } = require('jsonwebtoken');

async function HttpRegister(req, res, next) {
   try {
      const userToken = generateToken();
      const hashToken = await createHash(userToken);
      console.log(hashToken);
      if (await existingUser(req.body.phone, User))
         return next(new Error('there is a user with the phone number', 409));
      const user = await User.create({
         phone: req.body.phone,
         token: hashToken,
      });
      if (!req.body.phone)
         return next(new Error('kindly enter a valid number', 400));
      await sendSms(req.body.phone, userToken);
      req.user = user;
      response(res, 201, user, 'token sent to phone');
   } catch (err) {
      return next(new Error(`can't verify phone number, ${err.message}`, 400));
   }
}

async function HttpLogin(req, res, next) {
   try {
      const user = await User.findOne({ phone: req.user.phone }).select(
         '+token'
      );
      console.log(user);
      const verify = await verify();
      console.log(user);
      console.log(hashToken);

      if (!user) return next(new Error('code expired or invalid', 400));
      console.log(user, hashToken);
      //hash the token
      //find user with the hashed token
   } catch (err) {
      return next(new Error(`cant verify token, kindly try again`, 400));
   }
}

module.exports = {
   HttpRegister,
   HttpLogin,
};
