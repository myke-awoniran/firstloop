const response = require('../../../utils/response');
const AsyncError = require('../err/Async Error/asyncError');
const Message = require('../../database/models/messagesModel');
const AppError = require('../err/Operational Error/Operational_Error');

exports.sendMessage = AsyncError(async (req, res, next) => {
   const newMessage = await Message.create({
      sender: req.user.id,
      content: req.body.content,
      chat: req.body.chatId,
      receiver: req.params.userId,
   });
   response(res, 200, newMessage);
});

exports.getMessages = AsyncError(async (req, res, next) => {
   const message = await Message.find(req.params.id, req.body);
   if (!message)
      return next(new AppError('message to update does not exist', 200));
   response(res, 200, message);
});

exports.deleteMessage = AsyncError(async (req, res, next) => {
   const message = await Message.findByIdAndDelete(req.params.id);
   if (!message) return next(new AppError('message to delete'));
   response(res, 200, 'message deleted successfully');
});
