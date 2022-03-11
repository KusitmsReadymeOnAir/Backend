import express from "express";
import upload from "../config/s3";
import boardController from "../controllers/board";

const router = express.Router();

router.post("/imageUpload", upload.single('imgs'), boardController.imageUpload);
router.post("/write", boardController.write);
router.post("/checkPw", boardController.checkPw);
router.get("/delete/:id" , boardController.deleteBoard);
router.post("/update/:id", boardController.update);
router.get("/show/:id", boardController.showBoard);
router.get("/list", boardController.list);
router.get("/list/:category", boardController.listByCategory);

export = router;