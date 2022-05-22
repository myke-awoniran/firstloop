const mongoose = require('../Mongoose Error/mongooseError');

const JWT = require('../connections Errors/connectionError');

//handles errors in production
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

//handles error in development
function handleDevErr(err, res) {
   return res.status(err.statusCode || 500).json({
      status: 'error',
      err,
      message: err.message,
      name: err.name,
   });
}

// global error handling middleware
function errHandler(err, req, res, next) {
   if (process.env.NODE_ENV === 'production') {
      console.log(err);
      const error = { ...err };
      if (error.code === 11000) return mongoose.DuplicateError(error, res);
      if (err.name === 'CastError') return mongoose.CastError(error, res);
      if (err.name === 'ValidationError')
         return mongoose.ValidationError(error, res);
      if (err.name === 'JsonWebTokenError') JWT.JwtError(error, res);
      return handleProdErr(err, res);
   }
   handleDevErr(err, res);
}

module.exports = errHandler;
