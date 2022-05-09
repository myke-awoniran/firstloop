const AppError = require('../../err/Operational Error/Operational_Error');
const User = require('../../../database/models/userModel');
const response = require('../../../../utils/response');

//  config client details
const config = {
   CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
   CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};
const AUTH_OPTIONS = {
   callbackURL: '/api/v1/auth/google/callback',
   clientID: config.CLIENT_ID,
   clientSecret: config.CLIENT_SECRET,
};

const CALL_BACK_FAILURE = {
   failureRedirect: 'api/v1/failure',
   successRedirect: '/',
   session: true,
};

function NEW_GOOGLE_SIGN_UP(profile) {
   return {
      names: {
         first_name: profile._json.given_name,
         last_name: profile._json.family_name,
         middle_name: profile._json.family_name,
         user_name: profile._json.email,
      },
      email: profile._json.email,
      googleId: profile.id,
      profilePic: profile._json.picture,
   };
}

async function verifyCallback(accessToken, refreshToken, profile, Done) {
   try {
      const user = await User.findOne({ googleId: profile.id, active: true });
      if (user) return Done(null, user);
      const newUser = await User.create(NEW_GOOGLE_SIGN_UP(profile));
   } catch (err) {
      return next(new AppError('an error occurred, kindly try again', 400));
   }
   Done(null, profile);
}

function HttpGoogleOauthFailure(req, res, next) {
   return next(new AppError('failed to sign in, try again!!'));
}

function authenticated(req, res, next) {
   if (req.isAuthenticated()) return next();
   return next(
      new AppError(`you're not logged in,kindly login to access`, 401)
   );
}

module.exports = {
   HttpGoogleOauthFailure,
   verifyCallback,
   CALL_BACK_FAILURE,
   AUTH_OPTIONS,
   authenticated,
};
