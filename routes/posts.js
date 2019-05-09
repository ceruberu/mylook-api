var express = require("express");
var router = express.Router();
var postController = require('../controllers/postController');
var authMiddleware = require('../middlewares/authMiddleware');

/* GET users listing. */
router.post("/getPresignedURL", authMiddleware, postController.getPresignedURL);
router.post("/submitPhoto", postController.submitPhoto);

module.exports = router;
