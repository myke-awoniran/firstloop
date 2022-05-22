const jwt = require('jsonwebtoken');

async function signToken(id) {
   return await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
   });
}
async function verifyToken(id, userToken) {
   return await jwt.verify(id, userToken);
}

async function existingModel(email, Model) {
   return await Model.findOne({ email });
}

function productionErrorResponse(err, res, statusCode, message) {
   return res.status(statusCode).json({
      status: 'fail',
      message,
   });
}

module.exports = {
   signToken,
   verifyToken,
   existingModel,
   productionErrorResponse,
};
