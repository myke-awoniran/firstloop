const router = require('express').Router({ strict: true });

const {
   HttpUpdateUserCredentials,
   HttpGetUser,
   HttpDeleteAccount,
   HttpGetAllUsers,
   HttpRemoveUser,
   HttpGetUserByID,
   HttpGetUserPosts,
} = require('../../controllers/user/users');
const { upLoad } = require('../../file_uploads/AWS/imageFile');
const {
   HttpCheckLoggedIn,
   HttpRestrictedTo,
} = require('../../controllers/auth/authController');

router.get('/get-me', HttpCheckLoggedIn, HttpGetUser);
router.get('/users/:id', HttpCheckLoggedIn, HttpGetUserByID);
router.patch('/delete-account', HttpCheckLoggedIn, HttpDeleteAccount);
router.patch(
   '/update-credentials',
   HttpCheckLoggedIn,
   HttpUpdateUserCredentials
);
router.post('/upload-images', HttpCheckLoggedIn, upLoad);
router.get('/my-posts', HttpCheckLoggedIn, HttpGetUserPosts);

// user routes that are only accessible by admins
router.get('/users', HttpCheckLoggedIn, HttpGetAllUsers);
router.delete(
   '/remove-user/:id',
   HttpCheckLoggedIn,
   HttpRestrictedTo('admin'),
   HttpRemoveUser
);

// routes for friends

router.post('/users/add-friends');

router.get('/my-friends');

router.patch('/users/unfriend');

module.exports = router;
