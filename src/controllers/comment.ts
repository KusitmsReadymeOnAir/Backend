import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment";
const ObjectId = require('mongoose').Types.ObjectId;

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
        parentComment : req.body.parentComment,
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


const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pwData = await Comment.findById({"_id":ObjectId(req.body.id)});
        console.log(pwData);
        if(pwData!.pw==req.body.pw){
            await Comment.findByIdAndDelete({"_id":ObjectId(req.body.id)});
            res.status(200).json({
                result: "삭제 완료"
            })
        }
        else{
            res.status(500).json({
                error: "비밀번호 불일치"
            })
        }
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}


export default {
    getAllCommentData,
    addComment,
    deleteComment
}