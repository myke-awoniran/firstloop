// for marking operational errors so as to send meaning ful error messages to users
class AppError extends Error {
   constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      //to mark known errors
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
   }
}

module.exports = AppError;
