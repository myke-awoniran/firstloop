const {
   ThisMonthPage,
} = require('twilio/lib/rest/api/v2010/account/usage/record/thisMonth');

class AppError extends Error {
   constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      //to mark known errors
      this.message = message;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
   }
}

module.exports = AppError;
