const axios = require('axios');
const querystring = require('query-string');
const Email = require('../../../email/email');
const response = require('../../../../utils/response');
const User = require('../../../database/models/userModel');
const { signToken } = require('../../../../utils/helperFunctions');
const AppError = require('../../err/Operational Error/Operational_Error');

const config = {
   CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
   CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
   redirect_URI: 'api/v1auth/google/callback',
};

function createUser(googleUser) {
   return {
      names: {
         first_name: googleUser.data.given_name,
         last_name: googleUser.data.family_name,
         middle_name: googleUser.data.given_name,
         user_name: googleUser.data.email.split('@')[0],
      },
      googleId: googleUser.data.id,
      profilePic: googleUser.data.picture,
      email: googleUser.data.email,
   };
}

function getGoogleAuthURL() {
   const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
   const options = {
      redirect_uri: 'http://localhost:3000/api/v1/auth/google/callback',
      client_id: config.CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
         'https://www.googleapis.com/auth/userinfo.profile',
         'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
   };
   return `${rootUrl}?${querystring.stringify(options)}`;
}

function HttpReturnGoogleLink(req, res, next) {
   res.redirect(getGoogleAuthURL());
}

async function getTokens(credentialOject) {
   const url = 'https://oauth2.googleapis.com/token';
   const values = {
      code: credentialOject.code,
      client_id: credentialOject.clientId,
      client_secret: credentialOject.clientSecret,
      redirect_uri: credentialOject.redirectUri,
      grant_type: 'authorization_code',
   };
   const googleResponse = await axios.post(url, querystring.stringify(values), {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
   });

   if (!googleResponse) return new AppError('failed to fetch token', 404);
   return googleResponse.data;
}

async function HttpGetUserCredential(req, res, next) {
   try {
      const { code } = req.query;
      const { id_token: idToken, access_token: accessToken } = await getTokens({
         code,
         clientId: config.CLIENT_ID,
         clientSecret: config.CLIENT_SECRET,
         redirectUri: 'http://localhost:3000/api/v1/auth/google/callback',
      });
      //fetching the user from the access token
      const googleUser = await axios.get(
         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
         {
            headers: {
               Authorization: `Bearer ${idToken}`,
            },
         }
      );
      if (!googleUser) return next(new AppError('failed to fetch user ', 500));
      const registeredUser = await User.findOne({
         googleId: googleUser.data.id,
         active: true,
      });
      if (registeredUser)
         return response(
            res,
            200,
            'login successful',
            await signToken(registeredUser._id)
         );
      const newUser = await User.create(createUser(googleUser));
      await new Email(newUser, undefined).sendWelcome();
      response(res, 200, 'login successful', await signToken(newUser._id));
   } catch (err) {
      return next(
         new AppError(
            'An error occurred, check your internet connection and try again',
            500
         )
      );
   }
}

module.exports = {
   HttpReturnGoogleLink,
   HttpGetUserCredential,
};
