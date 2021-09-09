import { Router } from "express";
import controller from "../controllers/user";
const router = Router();

// @desc  edits user data
// @route POST /user/edit/:id
router.post("/edit/:id/", controller.editUserData);

// @desc get user profile image 
// @route GET /user/img/:id
router.get("/img/:id", controller.getImage);

// @desc upload img to the server
// @route POST /user/upload
router.post("/upload/:id", controller.uploadPhoto);

export default router;
