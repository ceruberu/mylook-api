const AWS = require('aws-sdk');

// The authorization mechanism you have provided is not supported. Please use AWS4-HMAC-SHA256.
// Error parsing the X-Amz-Credential parameter; the region 'us-east-1' is wrong; expecting 'ap-northeast-2'

const options = {
  signatureVersion: 'v4', 
  region: 'ap-northeast-2',
  // accessKeyId: process.env.ACCESSKEY,
  // secretAccessKey: process.env.SECRETKEY 
};

const s3 = new AWS.S3(options);

// const myBucket = process.env.S3_BUCKET;

module.exports = s3;
