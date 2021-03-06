import express from "express";
import upload from "../config/s3";
import boardController from "../controllers/board";

const router = express.Router();

router.post("/imageUpload", upload.single('imgs'), boardController.imageUpload);
router.post("/write", boardController.write);
router.post("/checkBoardPermission", boardController.checkBoardPermission);
router.delete("/delete" , boardController.deleteBoard);
router.post("/update", boardController.update);
router.get("/show/:id", boardController.showBoard);
router.get("/list", boardController.list);
router.get("/list/:category", boardController.listByCategory);
router.get("/search", boardController.search)

export = router;