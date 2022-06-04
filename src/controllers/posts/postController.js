const response = require('../../../utils/response');
const Post = require('../../database/models/postModel');
const AsyncError = require('../err/Async Error/asyncError');
const { dumpComment, dumpPost } = require('../../../utils/dump');
const Comment = require('../../database/models/commentModel');
const AppError = require('../err/Operational Error/Operational_Error');

function Options(req) {
   return {
      creator: req.user,
      post: req.body.post,
      postImage: req.body.photo,
   };
}

exports.HttpCreateNewPost = AsyncError(async (req, res, next) => {
   const newPost = await Post.create(Options(req));
   req.user.posts.push(newPost._id);
   await req.user.save();
   response(res, 201, dumpPost(newPost));
});

exports.HttpGetPost = AsyncError(async (req, res, next) => {
   const post = await Post.findById(req.params.postId);
   if (!post) return next(new AppError('no post found with that id', 200));
   response(res, 200, dumpPost(post));
});

exports.HttpGetAllPosts = AsyncError(async (req, res, next) => {
   let posts = await Post.find({}, { __v: 0 }).sort('-date');
   posts = posts.map((el) => dumpPost(el));
   response(res, 200, posts);
});

exports.HttpDeletePost = AsyncError(async (req, res, next) => {
   await Post.findByIdAndDelete(req.params.postId);
   response(res, 204, 'post deleted');
});

exports.HttpEditPost = AsyncError(async (req, res, next) => {
   const post = await Post.findByIdAndUpdate(req.params.postId, req.body);
   response(res, 200, post);
});

exports.HttpLikePost = AsyncError(async (req, res, next) => {
   await Post.findByIdAndUpdate(
      req.params.postId,
      {
         $push: { likeBy: req.user._id },
      },
      { new: false, upsert: true }
   );
   response(res, 200, 'liked');
});

exports.HttpUnlikePost = AsyncError(async (req, res, next) => {
   await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { likeBy: req.user._id },
   });
   response(res, 200, 'unliked');
});

exports.HttpSharePost = AsyncError(async (req, res, next) => {
   req.user.posts.push(req.params.postId);
   await req.user.save();
   response(res, 200, 'post shared');
});

exports.HttpCommentPost = AsyncError(async (req, res, next) => {
   const newComment = await Comment.create({
      comment: req.body.comment,
      commentBy: req.user._id,
      postId: req.params.postId,
   });
   const post = await Post.findById(req.params.postId);
   post.comments.push(newComment._id);
   await post.save();
   response(res, 200, dumpComment(newComment));
});

exports.HttpGetAllCommentForPost = AsyncError(async (req, res, next) => {
   const comments = await Comment.find(
      { postId: req.params.postId },
      { __v: 0 }
   ).sort('-date');
   response(res, 200, comments);
});
