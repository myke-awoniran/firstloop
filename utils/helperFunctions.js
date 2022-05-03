const bcrypt = require('bcrypt');

function generateToken() {
   const randomToken = Math.floor(100000 + Math.random() * 900000).toString();
   return randomToken;
}

async function createHash(string) {
   return await bcrypt.hash(string, 10);
}

async function verify(token, userToken) {
   return await bcrypt.compare(token, userToken);
}
async function existingUser(phone, model) {
   return await model.findOne({ phone });
}

module.exports = {
   generateToken,
   createHash,
   verify,
   existingUser,
};
