// const { checkEmailInUse, checkUsernameInUse, createUser, hashPassword, comparePassword, createToken, verifyToken, getUser } = require('../services/userServices');
const S3 = require('../s3');
const { createPresignedURL } = require('../services/postServices');

module.exports = {
  getPresignedURL: async (req, res) => {
    try {
      const presignedURL = await createPresignedURL();
      res.status(200).send(presignedURL);
    } catch (err) {
      throw err;
    }
  },
  submitPhoto: async (req, res) => {
    const { user } = req.body;
    console.log(req.body);
  }
};