"use strict";

var response = require('../../../utils/response');

var Post = require('../../database/models/postModel');

var AsyncError = require('../err/Async Error/asyncError'); // const Comment = require('../../database/models/commentModel');


var Comment = require('../../database/models/commentModel');

var AppError = require('../err/Operational Error/Operational_Error');

function Options(req) {
  return {
    creator: req.user,
    post: req.body.post,
    postImage: req.body.photo
  };
}

exports.HttpCreateNewPost = AsyncError(function _callee(req, res, next) {
  var newPost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Post.create(Options(req)));

        case 2:
          newPost = _context.sent;
          req.user.posts.push(newPost._id);
          _context.next = 6;
          return regeneratorRuntime.awrap(req.user.save());

        case 6:
          response(res, 201, newPost);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.HttpGetPost = AsyncError(function _callee2(req, res, next) {
  var post;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Post.findById(req.params.postId));

        case 2:
          post = _context2.sent;

          if (post) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError('no post found with that id', 200)));

        case 5:
          response(res, 200, post);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.HttpGetAllPosts = AsyncError(function _callee3(req, res, next) {
  var posts;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Post.find({}, {
            __v: 0
          }).sort('-date'));

        case 2:
          posts = _context3.sent;
          response(res, 200, posts);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.HttpDeletePost = AsyncError(function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Post.findByIdAndDelete(req.params.postId));

        case 2:
          response(res, 204, 'post deleted');

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.HttpEditPost = AsyncError(function _callee5(req, res, next) {
  var post;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.postId, req.body));

        case 2:
          post = _context5.sent;
          response(res, 200, post);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.HttpLikePost = AsyncError(function _callee6(req, res, next) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.postId, {
            $push: {
              likeBy: req.user._id
            }
          }, {
            "new": false,
            upsert: true
          }));

        case 2:
          response(res, 200, 'liked');

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.HttpUnlikePost = AsyncError(function _callee7(req, res, next) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Post.findByIdAndUpdate(req.params.postId, {
            $pull: {
              likeBy: req.user._id
            }
          }));

        case 2:
          response(res, 200, 'unliked');

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.HttpSharePost = AsyncError(function _callee8(req, res, next) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          req.user.posts.push(req.params.postId);
          _context8.next = 3;
          return regeneratorRuntime.awrap(req.user.save());

        case 3:
          response(res, 200, 'shared');

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.HttpCommentPost = AsyncError(function _callee9(req, res, next) {
  var newComment, post;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Comment.create({
            comment: req.body.comment,
            commentBy: req.user._id
          }));

        case 2:
          newComment = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(Post.findById(req.params.postId));

        case 5:
          post = _context9.sent;
          post.comments.push(newComment._id);
          _context9.next = 9;
          return regeneratorRuntime.awrap(post.save());

        case 9:
          response(res, 200); // console.log('I am working now');
          // grab the postId
          // add the comment Id to the comment of the post
          // populate and send the comment out instantly

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  });
});