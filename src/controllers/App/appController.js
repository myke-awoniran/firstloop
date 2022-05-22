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

exports.HttpHandleUndefinedRoutes = (req, res, next) =>
   next(new AppError(`can't find this ${req.originalUrl} on this server`, 404));
