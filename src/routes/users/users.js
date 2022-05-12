const router = require('express').Router({ strict: true });

const {
   HttpUpdateUserCredentials,
   HttpGetUser,
   HttpDeleteAccount,
   HttpGetAllUsers,
   HttpRemoveUser,
   HttpGetUserByID,
} = require('../../controllers/user/users');

const {
   HttpCheckLoggedIn,
   HttpRestrictedTo,
} = require('../../controllers/auth/authController');

router.use(HttpCheckLoggedIn);
router.get('/get-me', HttpGetUser);
router.get('/users/:id', HttpGetUserByID);
router.patch('/delete-account', HttpDeleteAccount);
router.patch('/update-credentials', HttpUpdateUserCredentials);

// user routes that are only accessible by admins
router.get('/users', HttpRestrictedTo('admin'), HttpGetAllUsers);
router.delete('/remove-user/:id', HttpRestrictedTo('admin'), HttpRemoveUser);

module.exports = router;
