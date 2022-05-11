function AsyncError(fn) {
   return (req, res, next) => {
      fn(req, res, next).catch(next);
   };
}
module.exports = AsyncError;
