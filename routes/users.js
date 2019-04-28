// import userController from '../controllers/userController';

var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController');


/* GET users listing. */
router.post("/me", userController.userMe);
router.post("/checkEmail", userController.userCheckEmail);
router.post("/checkUsername", userController.userCheckUsername);
router.post("/signup", userController.userSignupPost);
router.post("/login", userController.userLoginPost);

module.exports = router;
