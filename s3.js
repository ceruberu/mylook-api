const AWS = require('aws-sdk');

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY 
});

// const myBucket = process.env.S3_BUCKET;

module.exports = s3;
