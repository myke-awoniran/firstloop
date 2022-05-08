const router = require('express').Router();
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const {
   AUTH_OPTIONS,
   verifyCallback,
   CALL_BACK_FAILURE,
   HttpGoogleOauthFailure,
} = require('../../controllers/auth/social_sign_on/auth.passport');

const {
   HttpRegister,
   HttpLogin,
   HttpUpdateUserCredentials,
   HttpCheckLoggedIn,
} = require('../../controllers/auth/authController');

router.use(passport.initialize());

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

router.post('/register', HttpRegister);

router.post('/sign-in', HttpLogin);

router.patch(
   '/update-credentials',
   HttpCheckLoggedIn,
   HttpUpdateUserCredentials
);

router.get(
   '/auth/google',
   passport.authenticate('google', {
      scope: ['email', 'profile'],
   })
);

router.get(
   '/auth/google/callback',
   passport.authenticate('google', CALL_BACK_FAILURE, (req, res) =>
      console.log('google called us back')
   )
);

router.get('/auth/logout');
router.get('/failure', HttpGoogleOauthFailure);

module.exports = router;
