function response(res, statusCode, data, token) {
   res.status(statusCode).json({
      status: 'success',
      data,
      token,
   });
}
module.exports = response;
