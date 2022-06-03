function response(res, statusCode, data, token) {
   res.status(statusCode).json({
      status: 'success',
      // result: data.length,
      data,
      token,
   });
}
module.exports = response;
