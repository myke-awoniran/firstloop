"use strict";

var router = require('express').Router({
  strict: true
});

var _require = require('../../controllers/user/users'),
    HttpUpdateUserCredentials = _require.HttpUpdateUserCredentials,
    HttpGetUser = _require.HttpGetUser,
    HttpDeleteAccount = _require.HttpDeleteAccount,
    HttpGetAllUsers = _require.HttpGetAllUsers,
    HttpRemoveUser = _require.HttpRemoveUser,
    HttpGetUserByID = _require.HttpGetUserByID,
    HttpGetUserPosts = _require.HttpGetUserPosts,
    HttpAddFriend = _require.HttpAddFriend,
    HttpMyFriends = _require.HttpMyFriends,
    HttpSearchUser = _require.HttpSearchUser;

var _require2 = require('../../controllers/auth/authController'),
    HttpCheckLoggedIn = _require2.HttpCheckLoggedIn,
    HttpRestrictedTo = _require2.HttpRestrictedTo;

var _require3 = require('../../file_uploads/AWS/imageFile'),
    upLoad = _require3.upLoad;

router.get('/get-me', HttpCheckLoggedIn, HttpGetUser);
router.get('/users/:id', HttpCheckLoggedIn, HttpGetUserByID);
router.patch('/delete-account', HttpCheckLoggedIn, HttpDeleteAccount);
router.patch('/update-credentials', HttpCheckLoggedIn, HttpUpdateUserCredentials);
router.get('/upload-images', HttpCheckLoggedIn, upLoad);
router.get('/my-posts', HttpCheckLoggedIn, HttpGetUserPosts); // user routes that are only accessible by admins

router.get('/users', HttpCheckLoggedIn, HttpGetAllUsers);
router["delete"]('/remove-user/:id', HttpCheckLoggedIn, HttpRestrictedTo('admin'), HttpRemoveUser); // routes for friends

router.get('/search', HttpSearchUser);
router.post('/users/add-friends/:userId', HttpCheckLoggedIn, HttpAddFriend);
router.get('/my-friends', HttpCheckLoggedIn, HttpMyFriends);
router.patch('/unfriend/:userId', HttpCheckLoggedIn);
module.exports = router;