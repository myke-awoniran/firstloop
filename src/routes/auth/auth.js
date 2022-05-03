const router = require('express').Router({ strict: true });
const {
   HttpRegister,
   HttpLogin,
} = require('../../controllers/auth/authController');

router.post('/register', HttpRegister);

router.post('/login', HttpLogin);

module.exports = router;
