const uuidv4 = require('uuid/v4');
const Query = require("../db");
const S3 = require('../s3');

module.exports = {
  createPresignedURL: async () => {
    const uuid = uuidv4();
    let now = new Date();
    now.setMinutes(now.getMinutes() + 5);
    const expirationTime = new Date(now).toISOString();

    const params = {
      Bucket: process.env.S3_BUCKET,
      Expiration: expirationTime,
      Conditions: [
        ['content-length-range', 0, 10000000] // 10 Mb
      ],
      Fields: {
        key: uuid
      }
    };
    
    try {
      const presignedObj = await S3.createPresignedPost(params)
      return presignedObj;
    } catch(err) {
      throw(err);
    }

  }
}