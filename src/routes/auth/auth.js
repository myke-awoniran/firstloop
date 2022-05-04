const router = require('express').Router({ strict: true });
const {
   HttpRegister,
   HttpLogin,
   HttpUpdateUserCredentials,
} = require('../../controllers/auth/authController');

router.post('/register', HttpRegister);

router.post('/login', HttpLogin);
router.patch('/update-credentials/:id', HttpUpdateUserCredentials);

module.exports = router;
