const {
   mongooseCastError,
   mongooseDuplicateError,
   mongooseValidationError,
} = require('../Mongoose Error/mongooseError');
const { JwtError } = require('../connections Errors/connectionError');

function errHandler(err, req, res, next) {
   if (process.env.NODE_ENV === 'production') {
      const error = { ...err };
      if (error.code === 11000) return mongooseDuplicateError(error, res);
      if (err.name === 'CastError') return mongooseCastError(error, res);
      if (err.name === 'ValidationError')
         return mongooseValidationError(error, res);
      if (err.name === 'JsonWebTokenError') JwtError(error, res);
      return handleProdErr(err, res);
   }
   handleDevErr(err, res);
}

function handleProdErr(err, res) {
   if (err.isOperational)
      return res.status(err.statusCode || 500).json({
         status: err.status,
         isOperational: err.isOperational,
         message: err.message,
      });
   return res.status(500).json({
      status: 'error',
      message: 'something went very wrong !!!',
   });
}

function handleDevErr(err, res) {
   return res.status(err.statusCode || 500).json({
      status: 'error',
      err,
      message: err.message,
      name: err.name,
   });
}

module.exports = errHandler;
