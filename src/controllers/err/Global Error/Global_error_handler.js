const AppError = require('../Operational Error/Operational_Error');

function errHandler(err, req, res, next) {
   if (process.env.NODE_ENV === 'production') {
      return handleProdErr(err, res);
   }
   handleDevErr(err, res);
}

function handleProdErr(err, res) {
   let error = { ...err };
   if (error.name === 'CastError')
      return res.status(err.statusCode || 400).json({
         status: 'error',
         message: `Invalid ${err.path} : ${err.value}`,
      });

   if (error.name === 'ValidationError')
      return res.status(400).json({
         status: 'error',
         message: `error validation ${2 + 3}`,
      });
}

function handleDevErr(err, res) {
   return res.status(err.statusCode || 500).json({
      status: 'error',
      err,
      message: err.message,
      stack: err.stack,
   });
}

module.exports = errHandler;
