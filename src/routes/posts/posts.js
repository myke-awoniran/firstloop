const router = require('express').Router();
const { HttpCheckLoggedIn } = require('../../controllers/auth/authController');
const {
   HttpCreateNewPost,
   HttpDeletePost,
   HttpGetAllPosts,
   HttpGetPost,
   HttpEditPost,
   HttpLikePost,
   HttpSharePost,
   HttpCommentPost,
   HttpUnlikePost,
} = require('../../controllers/posts/postController');

router.get('/get-all-posts', HttpGetAllPosts);

router.post('/create-post', HttpCheckLoggedIn, HttpCreateNewPost);
router
   .route('/posts/:postId')
   .patch(HttpCheckLoggedIn, HttpEditPost)
   .get(HttpCheckLoggedIn, HttpGetPost)
   .delete(HttpCheckLoggedIn, HttpDeletePost);

router
   .route('/posts/likes/:postId')
   .post(HttpCheckLoggedIn, HttpLikePost)
   .patch(HttpCheckLoggedIn, HttpUnlikePost);
module.exports = router;
