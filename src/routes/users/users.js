const router = require('express').Router({ strict: true });
const {
   HttpUpdateUserCredentials,
   HttpGetUser,
   HttpDeleteAccount,
   HttpGetAllUsers,
   HttpRemoveUser,
   HttpGetUserByID,
   HttpGetUserPosts,
   HttpAddFriend,
   HttpMyFriends,
} = require('../../controllers/user/users');

const {
   HttpCheckLoggedIn,
   HttpRestrictedTo,
} = require('../../controllers/auth/authController');

const { upLoad } = require('../../file_uploads/AWS/imageFile');

router.get('/get-me', HttpCheckLoggedIn, HttpGetUser);
router.get('/users/:id', HttpCheckLoggedIn, HttpGetUserByID);
router.patch('/delete-account', HttpCheckLoggedIn, HttpDeleteAccount);
router.patch(
   '/update-credentials',
   HttpCheckLoggedIn,
   HttpUpdateUserCredentials
);
router.get('/upload-images', HttpCheckLoggedIn, upLoad);

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

router.post('/users/add-friends/:userId', HttpCheckLoggedIn, HttpAddFriend);

router.get('/my-friends', HttpCheckLoggedIn, HttpMyFriends);

router.patch('/unfriend/:userId', HttpCheckLoggedIn);

module.exports = router;
