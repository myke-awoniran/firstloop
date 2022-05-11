const router = require('express').Router();
const User = require('../../database/models/userModel');

const {
   HttpGetUserCredential,
   HttpReturnGoogleLink,
} = require('../../controllers/auth/social_sign_on/auth.passport');

const {
   HttpRegister,
   HttpLogin,
   HttpUpdateUserCredentials,
   HttpCheckLoggedIn,
} = require('../../controllers/auth/authController');

// user with email and password
router.post('/register', HttpRegister);
router.post('/sign-in', HttpLogin);
router.post('/forget-password');
router.post('/reset-password');

//using google to sign in user
router.get('/auth/google/url', HttpReturnGoogleLink);
router.get('/auth/google/callback', HttpGetUserCredential);

module.exports = router;
