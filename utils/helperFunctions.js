const jwt = require('jsonwebtoken');

async function signToken(id) {
   return await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
   });
}
async function verifyToken(id, userToken) {
   return await jwt.verify(id, token);
}
module.exports = {
   signToken,
   verifyToken,
};
