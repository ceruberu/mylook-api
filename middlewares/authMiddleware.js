const jwt = require('jsonwebtoken');
const { getUser, verifyToken } = require('../services/userServices');

async function authMiddleware (req, res, next) {
  console.log("HEY");
  try { 
    const decode = await verifyToken(req.cookies.token);
    if(decode.user_id) {
      console.log(decode);
      next();
    }
  } catch(err) {
    throw err;
  }
}

module.exports = authMiddleware;