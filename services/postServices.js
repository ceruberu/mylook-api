const uuidv4 = require('uuid/v4');
const Query = require("../db");
const S3 = require('../s3');

module.exports = {
  createPresignedURL: async () => {
    const uuid = uuidv4();
    const expiresIn = 600;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: uuid,
      Expires: expiresIn
    };
    
    try {
      const url = await S3.getSignedUrl('putObject', params);
      return url;
    } catch(err) {
      throw(err);
    }

  }
}