import express from "express";
import testController from "../controllers/test";


const router = express.Router();

router.get("/getAllData", testController.getAllData);
router.post("/addTestData", testController.addTestData);

export = router;