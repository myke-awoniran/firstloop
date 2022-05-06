const router = require('express').Router({ strict: true });
const {
   HttpRegister,
   HttpLogin,
   HttpUpdateUserCredentials,
   HttpCheckLoggedIn,
} = require('../../controllers/auth/authController');

router.post('/register', HttpRegister);

router.post('/login/:phone', HttpLogin);

router.patch(
   '/update-credentials',
   HttpCheckLoggedIn,
   HttpUpdateUserCredentials
);

module.exports = router;
