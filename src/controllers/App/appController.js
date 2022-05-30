const { join } = require('path');
const { existsSync } = require('fs');
const { appendFile, mkdir } = require('fs/promises');
const response = require('../../../utils/response');
const AppError = require('../err/Operational Error/Operational_Error');

exports.HttpHomeController = (req, res, next) => {
   response(
      res,
      200,
      'welcome to first-loop chat-app',
      `Discuss any topic, dive into people's interests, hobbies, passions and more ...`
   );
};

exports.HttpHandleUndefinedRoutes = (req, res, next) => {
   next(
      new AppError(
         `can't find this ${req.originalUrl} on this server with method ${req.method}, \n check the URI and provide the correct HTTP verb/ method`,
         404
      )
   );
};

exports.Logger = async (req, res, next) => {
   let location = join(__dirname, '../..', '/logs');
   location = existsSync(location) ? location : mkdir(location);
   await appendFile(
      join(location, 'logs.txt'),
      `\n${req.method} to ${req.originalUrl} @ ${Date.now()} respond with ${
         res.statusCode
      }`
   );
   next();
};
