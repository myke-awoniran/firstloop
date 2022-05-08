const res = require('express/lib/response');
const AppError = require('../../err/Operational Error/Operational_Error');

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
   session: false,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
   console.log(profile, accessToken, refreshToken);
   done(null, profile);
}

function HttpGoogleOauthFailure(req, res, next) {
   return next(new AppError('failed to sign in, try again!!'));
}

module.exports = {
   HttpGoogleOauthFailure,
   verifyCallback,
   CALL_BACK_FAILURE,
   AUTH_OPTIONS,
};
