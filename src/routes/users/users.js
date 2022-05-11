const router = require('express').Router({ strict: true });
const {
   HttpUpdateUserCredentials,
   HttpGetUser,
   HttpDeleteAccount,
} = require('../../controllers/user/users');
const { HttpCheckLoggedIn } = require('../../controllers/auth/authController');

router.use(HttpCheckLoggedIn);
router.patch('/update-credentials', HttpUpdateUserCredentials);
router.get('/get-me', HttpGetUser);
router.patch('/delete-account', HttpDeleteAccount);
module.exports = router;
