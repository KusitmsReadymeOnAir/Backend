import commentController from "../controllers/comment";
import express from "express";

var router = express.Router();
var Comments = require('../models/comment');
var Board = require('../models/board');


// create
router.post("/addComment", commentController.addComment);
router.get("/list", commentController.getAllCommentData);
router.delete("/deleteComment", commentController.deleteComment);
router.post("/checkCommentPermission", commentController.checkCommentPermission);



export = router;