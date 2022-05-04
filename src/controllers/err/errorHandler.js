function errHandler(err, req, res, next) {
   process.env.NODE_ENV === 'production'
      ? handleProdErr(err, res)
      : handleDevErr(err, res);
}

module.exports = errHandler;

function handleProdErr(err, res) {
   return res.status(500).json({
      status: statMessage,
      error: {
         err,
      },
   });
}

function handleDevErr(err, res) {
   return res.status(500).json({
      status: statMessage,
      error: {
         err,
      },
   });
}
