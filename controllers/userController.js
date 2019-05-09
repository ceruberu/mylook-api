const { checkEmailInUse, checkUsernameInUse, createUser, hashPassword, comparePassword, createToken, verifyToken, getUser } = require('../services/userServices');

module.exports = {
  userMe: async (req, res) => {
    try {
      const decode = await verifyToken(req.cookies.token);
      const user = await getUser('user_id', decode.user_id, false);
      res.status(200).send(user);
    } catch (err) {
      res.clearCookie('token', {httpOnly: true});
      res.status(401).send({
        errorMessage: "Unauthorized, please log in"
      })
    }

  },
  userCheckEmail: async (req, res) => {
    const { email } = req.body;
    try {
      const emailUsed = await checkEmailInUse(email);
      res.status(200).send(emailUsed);
    } catch (err) {
      res.status(400).send();
    }
  },
  userCheckUsername: async (req, res) => {

  },
  userSignupPost: async (req, res) => {
    const { email, password, username } = req.body;
    try {
      const emailUsed = await checkEmailInUse(email);
      const usernameUsed = await checkUsernameInUse(username);

      if (!emailUsed && !usernameUsed) {
        const hashedPassword = await hashPassword(password);
        const newUserid = await createUser(email, hashedPassword, username);
        const newUser = await getUser('user_id', newUserid, false);
        const newToken = await createToken(newUser.user_id, newUser.email);
        res.cookie('token', newToken, {httpOnly: true});
        res.status(200).send(newUser);
      } else {
        res.status(200).send({
          emailUsed,
          usernameUsed
        })
      }
    } catch (err) {
      throw err;
    }
  },
  userLoginPost: async (req, res) => {
    try {
      const user = await getUser('email', req.body.email, true);
      if (user) {
        const checkPassword = await comparePassword(req.body.password, user.password);
        const newToken = await createToken(user.user_id, req.body.email);

        // Spread copy without password
        const { password, ...userWithoutPass } = user; 

        res.cookie('token', newToken, {httpOnly: true});
        res.status(200).send(userWithoutPass);
      } else {
        // user with request email does not exist
      }
    } catch(err) {
      throw err;
    }
  }
};