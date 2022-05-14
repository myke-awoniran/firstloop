const Post = require('../../database/models/postModel');
const response = require('../../../utils/response');
const AsyncError = require('../err/Async Error/asyncError');
const AppError = require('../err/Operational Error/Operational_Error');

function Options(req) {
   return {
      creator: req.user._id,
      post: req.body.post,
      postImage: [req.body.photo],
   };
}

exports.HttpCreateNewPost = AsyncError(async (req, res, next) => {
   const newPost = await Post.create(Options(req));
   req.user.posts.push(newPost._id);
   await req.user.save();
   response(res, 201, newPost);
});

exports.HttpGetPost = AsyncError(async (req, res, next) => {
   const post = await Post.findById(req.params.postId);
   if (!post)
      return next(
         new AppError('no post found, this post might be deleted', 404)
      );
   response(res, 200, post);
});

exports.HttpGetAllPosts = AsyncError(async (req, res, next) => {
   const posts = await Post.find({}, { __v: 0 }).sort('-date');
   response(res, 200, posts);
});

exports.HttpDeletePost = AsyncError(async (req, res, next) => {
   await Post.findByIdAndDelete(req.params.postId);
   response(res, 204, 'post deleted');
});

exports.HttpEditPost = AsyncError(async (req, res, next) => {
   const post = await Post.findByIdAndUpdate(req.params.postId, req.body);
   if (!post) return next(new AppError('post not found', 400));
   response(res, 200, post);
});

exports.HttpLikePost = AsyncError(async (req, res, next) => {});

exports.HttpSharePost = AsyncError(async (req, res, next) => {});

exports.HttpCommentPost = AsyncError(async (req, res, next) => {});
