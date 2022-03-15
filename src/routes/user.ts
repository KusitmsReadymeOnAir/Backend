import userController from "../controllers/user";
import express from "express";

var router = express.Router();

router.get("/user/:id", userController.userInfo);
router.get("/board/:id", userController.userBoard);
router.get("/comment/:id", userController.userComment);

export = router;