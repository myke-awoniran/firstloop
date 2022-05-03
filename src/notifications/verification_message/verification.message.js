const config = require('../../../config/secret');
const client = require('twilio')(config.twillo_sms_SID, config.twillo_sms_name);

async function sendSms(phone, verification_code) {
   await client.messages.create({
      body: `your first loop verification code is :${verification_code}`,
      from: config.from,
      to: phone,
   });
}

module.exports = sendSms;
