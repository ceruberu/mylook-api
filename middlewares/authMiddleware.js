const jwt = require('jsonwebtoken');
const { getUser } = require('../services/userServices');

async function authMiddleware (req, res, next) {
  try { 
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (payload) {
        const user = await getUser('userid', payload.userid)
        if (user.length == 1) {
          req.user = user[0];
        }
      }
      next();
    })
  } catch(err) {
    throw err;
  }
}

modules.export = authMiddleware;