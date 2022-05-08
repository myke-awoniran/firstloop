const Message = require('../../database/models/messagesModel');
const response = require('../../../utils/response');
const AppError = require('../../../utils/Error');

async function createMessage(req, res, next) {
   try {
      const newMessage = await Message.create(req.body);
      response(res, 200, newMessage);
   } catch (err) {
      return next(err);
   }
}

async function EditMessage(req, res, next) {
   try {
      const message = await Message.findByIdAndUpdate(req.params.id, req.body);
      if (!message)
         return next(new AppError('message to update does not exist', 200));
      response(res, 200, message);
   } catch (err) {
      return next(err);
   }
}

async function deleteMessage(req, res, next) {
   try {
      const message = await Message.findByIdAndDelete(req.params.id);
      if (!message) return next(new AppError('message to delete'));
      response(res, 200, 'message deleted successfully');
   } catch (err) {
      return next(err);
   }
}

module.exports = {
   createMessage,
   deleteMessage,
   EditMessage,
};
