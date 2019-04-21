const bcrypt = require("bcrypt");
const Query = require("../db");
const saltRounds = 10;

module.exports = {
  checkEmailInUse: async email => {
    try {
      const result = await Query(
        "SELECT * from users WHERE email = ? LIMIT 1",
        email
      );

      if (result.length == 1) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      throw err;
    }
  },
  checkUsernameInUse: async username => {
    try {
      const result = await Query(
        "SELECT * from users WHERE username = ? LIMIT 1",
        username
      );

      if (result.length == 1) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      throw err;
    }
  },
  hashPassword: async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (email, password, username) => {

    const payload = {
      email, password, username
    }
    
    try {
      const newUser = await Query(
        'INSERT INTO users SET ?',
        payload
      );
      return newUser.insertId;
    } catch (err) {
      throw err;
    }
  },
  getUser: async (userid) => {
    try {
      const user = await Query(
        'SELECT * FROM users WHERE userid = ? LIMIT 1',
        userid
      );
      return user;
    } catch(err) {
      throw err;
    }
  }
};
