const router = require("express").Router();
const userController = require("../controllers/userController");

// @desc  edits user data
// @route POST /user/edit/:id
router.post("/edit/:id/", userController.editUserData);

// @desc get user profile image 
// @route GET /user/img/:id
router.get("/img/:id", userController.getImage);

// @desc upload img to the server
// @route POST /user/upload
router.post("/upload/:id", userController.uploadPhoto);


module.exports = router;
