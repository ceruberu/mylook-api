const { checkEmailInUse, checkUsernameInUse, createUser, hashPassword, getUser } = require('../services/userServices');

module.exports = {
  userSignupPost : async (req, res) => {
    const { email, password, username } = req.body;
    try {
      const emailUsed = await checkEmailInUse(email);
      const usernameUsed = await checkUsernameInUse(username);

      if (!emailUsed && !usernameUsed) {
        const hashedPassword = await hashPassword(password);
        const newUserid = await createUser(email, hashedPassword, username);
        const newUser = await getUser(newUserid);
      }
    } catch (err) {
      throw err;
    }
  }
};