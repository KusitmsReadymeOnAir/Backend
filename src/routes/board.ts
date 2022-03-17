import express from "express";
import upload from "../config/s3";
import boardController from "../controllers/board";

const router = express.Router();

router.post("/imageUpload", upload.single('imgs'), boardController.imageUpload);
router.post("/write", boardController.write);
<<<<<<< HEAD
// router.post("/checkPw", boardController.checkPw);
router.post("/checkBoardPermission", boardController.checkBoardPermission);
router.delete("/delete" , boardController.deleteBoard);
router.post("/update", boardController.update);
=======
<<<<<<< HEAD
router.post("/checkBoardPermission", boardController.checkBoardPermission);
router.get("/delete/:id" , boardController.deleteBoard);
=======
router.post("/checkPw", boardController.checkPw);
router.post("/checkBoardPermission", boardController.checkBoardPermission);
<<<<<<< HEAD
router.delete("/delete/" , boardController.deleteBoard);
>>>>>>> f5fccb3 (임시 커밋)
=======
router.delete("/delete" , boardController.deleteBoard);
>>>>>>> a4bad4e (작성자만 삭제 가능하게 수정)
router.post("/update/:id", boardController.update);
>>>>>>> c7c75fe (충돌 해결)
router.get("/show/:id", boardController.showBoard);
router.get("/list", boardController.list);
router.get("/list/:category", boardController.listByCategory);
router.get("/search", boardController.search)

export = router;