const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Query = require("../db");
const saltRounds = 10;

module.exports = {
  checkEmailInUse: async email => {
    try {
      const result = await Query(
        "SELECT * from users WHERE email = ? LIMIT 1",
        email
      );

      if (result.length === 1) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
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
    } catch (err) {
      throw err;
    }
  },
  hashPassword: async password => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      throw err;
    }
  },
  comparePassword: async (password, hashedPassword) => {
    try {
      const passwordIsMatch = await bcrypt.compare(password, hashedPassword);
      return passwordIsMatch;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (email, password, username) => {
    const payload = {
      email,
      password,
      username
    };

    try {
      const newUser = await Query("INSERT INTO users SET ?", payload);
      return newUser.insertId;
    } catch (err) {
      throw err;
    }
  },
  getUser: async (type, input) => {
    try {
      const user = await Query(
        `SELECT * FROM users WHERE ${type} = ? LIMIT 1`,
        input
      );
      return user[0];
    } catch (err) {
      throw err;
    }
  },
  createToken: async (user_id, email) => {
    try {
      let token = await jwt.sign({ user_id, email }, process.env.SECRET_KEY, {
        expiresIn: "24h"
      });
      return token;
    } catch(err) {
      throw err;
    }
  },
  verifyToken: async token => {
    try {
      const decode = await jwt.verify(token, process.env.SECRET_KEY);
      return decode;
    } catch (err) {
      throw err;
    }
  }
};
