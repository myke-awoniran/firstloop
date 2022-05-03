function errHandler(err, req, res, next) {
   const message = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';
   res.status(err.statusCode).json({
      status: message,
      error: { err, message: err.message, stack: err.stack },
   });
}
module.exports = errHandler;
