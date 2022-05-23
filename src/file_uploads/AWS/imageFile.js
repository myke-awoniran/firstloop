const Aws = require('aws-sdk');
const { v4: uuid } = require('uuid');
const response = require('../../../utils/response');

const awsKeyId = process.env.ACCESS_KEY_ID;
const awsSecretKey = process.env.SECRET_ACCESS_KEY;

const s3 = new Aws.S3({
   accessKeyId: awsKeyId,
   secretAccessKey: awsSecretKey,
});

function upLoad(req, res, next) {
   const Key = `user-${req.user.id}/${uuid()}/${Date.now()}.jpeg`;
   s3.getSignedUrl(
      'putObject',
      {
         Bucket: 'gobble-enterprise-123',
         ContentType: 'image/jpeg',
         Key,
      },
      (err, url) => response(res, 200, { url, Key })
   );
}
module.exports = {
   upLoad,
};
