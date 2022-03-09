import express from "express";
import boardController from "../controllers/board";

const router = express.Router();

router.get("/search", boardController.search);

export = router;