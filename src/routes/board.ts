import express from "express";
import upload from "../config/s3";
import boardController from "../controllers/board";

const router = express.Router();

router.post("/imageUpload", upload.single('imgs'), boardController.imageUpload);
router.post("/write", boardController.write);
<<<<<<< HEAD
<<<<<<< HEAD
// router.post("/checkPw", boardController.checkPw);
router.post("/checkBoardPermission", boardController.checkBoardPermission);
router.delete("/delete" , boardController.deleteBoard);
router.post("/update", boardController.update);
=======
<<<<<<< HEAD
=======
>>>>>>> e7eb2c7 (충돌 해결)
router.post("/checkBoardPermission", boardController.checkBoardPermission);
router.delete("/delete/" , boardController.deleteBoard);
router.post("/update/:id", boardController.update);
>>>>>>> c7c75fe (충돌 해결)
router.get("/show/:id", boardController.showBoard);
router.get("/list", boardController.list);
router.get("/list/:category", boardController.listByCategory);
router.get("/search", boardController.search)

export = router;