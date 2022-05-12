const router = require('express').Router();
const User = require('../../database/models/userModel');

const {
   HttpGetUserCredential,
   HttpReturnGoogleLink,
} = require('../../controllers/auth/social_sign_on/auth.passport');

const {
   HttpRegister,
   HttpLogin,
} = require('../../controllers/auth/authController');

// user with email and password

router.post('/register', HttpRegister);
router.post('/sign-in', HttpLogin);
router.post('/forgot-password', HttpLogin);
router.post('/reset-password', HttpLogin);

//using google to sign in user
router.get('/auth/google/url', HttpReturnGoogleLink);
router.get('/auth/google/callback', HttpGetUserCredential);

module.exports = router;
