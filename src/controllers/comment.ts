import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment";

const getAllCommentData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allData = await Comment.find({})
        res.status(200).json({
            commentData: allData
        })

    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}


const addComment = async (req: Request, res: Response, next: NextFunction) => {
      
    const commentData = new Comment({
        boardId: req.body.boardId,
        pw : req.body.pw, 
        createdAt:req.body.createdAt,
        Comment: req.body.Comment
    });

    try {
        await commentData.save();
        res.status(200).json({
            result: "저장 완료"
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}


export default {
    getAllCommentData,
    addComment
}