// import userController from '../controllers/userController';

var express = require("express");
var router = express.Router();
var userController = require('../controllers/userController');


/* GET users listing. */
router.post("/signup", userController.userSignupPost);

module.exports = router;
