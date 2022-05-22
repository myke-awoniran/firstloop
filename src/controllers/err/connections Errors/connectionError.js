const {
   productionErrorResponse,
} = require('../../../../utils/helperFunctions');

function JwtError(err, res) {
   const message = `your session expired !!!,re-login and try again`;
   productionErrorResponse(err, res, 400, message);
}

module.exports = { JwtError };
