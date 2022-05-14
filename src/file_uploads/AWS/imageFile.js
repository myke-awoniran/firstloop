const Aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const response = require('../../../utils/response');
const aws_key_id = process.env.ACCESS_KEY_ID;
const aws_secret_key = process.env.SECRET_ACCESS_KEY;

const s3 = new Aws.S3({
   accessKeyId: aws_key_id,
   secretAccessKey: aws_secret_key,
});

function upLoad(req, res, next) {
   const Key = `user-${req.user.id}/${uuidv4()}/${Date.now()}.jpeg`;
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
