"use strict";

var User = require('../../database/models/userModel');

var AsyncError = require('../err/Async Error/asyncError');

var response = require('../../../utils/response');

var Post = require('../../database/models/postModel');

var AppError = require('../err/Operational Error/Operational_Error');

var selectOptions = {
  chats: 0,
  calls: 0,
  __v: 0,
  active: 0,
  password: 0,
  notifications: 0,
  comments: 0,
  posts: 0,
  likes: 0
};
exports.HttpUpdateUserCredentials = AsyncError(function _callee(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user._id, req.body, {
            runValidators: true
          }));

        case 2:
          user = _context.sent;

          if (user) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new AppError("register to get started", 401)));

        case 5:
          response(res, 200, user);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.HttpGetUser = AsyncError(function _callee2(req, res, next) {
  var loggedInUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user._id, selectOptions));

        case 2:
          loggedInUser = _context2.sent;
          response(res, 200, loggedInUser);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.HttpDeleteAccount = AsyncError(function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.user.id, {
            active: false
          }));

        case 2:
          response(res, 200, 'account deleted !!');

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.HttpGetAllUsers = AsyncError(function _callee4(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.find({
            active: true
          }, selectOptions));

        case 2:
          users = _context4.sent;
          response(res, 200, users);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.HttpRemoveUser = AsyncError(function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req.params.id));

        case 2:
          user = _context5.sent;

          if (user) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", next(new AppError('cannot find any user with the id', 404)));

        case 5:
          response(res, 200, 'user deleted successful');

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.HttpGetUserByID = AsyncError(function _callee6(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 2:
          user = _context6.sent;

          if (user) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", next(new AppError('there is no user with the provided Id', 404)));

        case 5:
          response(res, 200, user);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}); // get personal information

exports.HttpGetUserPosts = AsyncError(function _callee7(req, res, next) {
  var userPosts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Post.find({
            creator: req.user.id
          }).sort('-date'));

        case 2:
          userPosts = _context7.sent;
          response(res, 200, userPosts);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
exports.HttpAddFriend = AsyncError(function _callee8(req, res, next) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          req.user.friends.push(req.params.userId);
          _context8.next = 3;
          return regeneratorRuntime.awrap(req.user.save());

        case 3:
          response(res, 200, 'friend request sent');

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
exports.HttpUnfriendUser = AsyncError(function _callee9(req, res, next) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
        case "end":
          return _context9.stop();
      }
    }
  });
});
exports.HttpMyFriends = AsyncError(function _callee10(req, res, next) {
  var friends;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.user.id, {
            friends: true
          }));

        case 2:
          friends = _context10.sent;
          response(res, 200, friends);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
exports.HttpSearchUser = AsyncError(function _callee11(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(User.find({
            search: req.query.users
          }));

        case 2:
          users = _context11.sent;
          console.log(users); // const users = await User.aggregate([
          //    {
          //       $search: {
          //          text: {
          //             query: req.query.users,
          //             path: ['names', 'about'],
          //          },
          //       },
          //    },
          //    {
          //       $limit: 5,
          //    },
          //    {
          //       $project: {
          //          _id: 0,
          //          name: 1,
          //          about: 1,
          //       },
          //    },
          // ]);

          response(res, 200, users);

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  });
});