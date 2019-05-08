var express = require("express");
var router = express.Router();
var postController = require('../controllers/postController');

/* GET users listing. */
router.post("/newPost", postController.newPost);

module.exports = router;
