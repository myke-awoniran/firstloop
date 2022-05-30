"use strict";

var _require = require('path'),
    join = _require.join;

var _require2 = require('fs'),
    existsSync = _require2.existsSync;

var _require3 = require('fs/promises'),
    appendFile = _require3.appendFile,
    mkdir = _require3.mkdir;

var response = require('../../../utils/response');

var AppError = require('../err/Operational Error/Operational_Error');

exports.HttpHomeController = function (req, res, next) {
  response(res, 200, 'welcome to first-loop chat-app', "Discuss any topic, dive into people's interests, hobbies, passions and more ...");
};

exports.HttpHandleUndefinedRoutes = function (req, res, next) {
  next(new AppError("can't find this ".concat(req.originalUrl, " on this server with method ").concat(req.method, ", \n check the URI and provide the correct HTTP verb/ method"), 404));
};

exports.Logger = function _callee(req, res, next) {
  var location;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          location = join(__dirname, '../..', '/logs');
          location = existsSync(location) ? location : mkdir(location);
          _context.next = 4;
          return regeneratorRuntime.awrap(appendFile(join(location, 'logs.txt'), "\n".concat(req.headers['x-custom-key'])));

        case 4:
          next();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};