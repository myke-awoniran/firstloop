"use strict";

var response = require('../../../utils/response');

var AsyncError = require('../err/Async Error/asyncError');

var Message = require('../../database/models/messagesModel');

var AppError = require('../err/Operational Error/Operational_Error');

exports.sendMessage = AsyncError(function _callee(req, res, next) {
  var newMessage;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Message.create({
            sender: req.user.id,
            content: req.body.content,
            chat: req.body.chatId,
            receiver: req.params.userId
          }));

        case 2:
          newMessage = _context.sent;
          response(res, 200, newMessage);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getMessages = AsyncError(function _callee2(req, res, next) {
  var message;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Message.find(req.params.id, req.body));

        case 2:
          message = _context2.sent;

          if (message) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next(new AppError('no message found', 200)));

        case 5:
          response(res, 200, message);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.deleteMessage = AsyncError(function _callee3(req, res, next) {
  var message;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Message.findByIdAndDelete(req.params.id));

        case 2:
          message = _context3.sent;

          if (message) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next(new AppError('message to delete')));

        case 5:
          response(res, 200, 'message deleted successfully');

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});