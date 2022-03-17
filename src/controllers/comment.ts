import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment";
import User from "../models/user";
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
        userId : req.body.userId,
        createdAt:req.body.createdAt,
        parentComment : req.body.parentComment,
<<<<<<< HEAD
        comment: req.body.Comment
=======
        comment: req.body.comment
>>>>>>> f5fccb3 (임시 커밋)
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


// const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    
//     try {
//         // const pwData = await Comment.findById({"_id":ObjectId(req.body.id)});
//         // console.log(pwData);
//         // if(pwData!.pw==req.body.pw){
//             await Comment.findByIdAndDelete({"_id":ObjectId(req.body.id)});
//             res.status(200).json({
//                 result: "삭제 완료"
//             })
//         //}
//         // else{
//         //     res.status(500).json({
//         //         error: "비밀번호 불일치"
//         //     })
//         // }
//     }
//     catch (error: any) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// }
const deleteComment = async( req : Request, res : Response, next : NextFunction) => {
    const { userId, commentId } = req.body;

    try {
<<<<<<< HEAD
        // const pwData = await Comment.findById({"_id":ObjectId(req.body.id)});
        // console.log(pwData);
        // if(pwData!.pw==req.body.pw){
            await Comment.findByIdAndDelete({"_id":ObjectId(req.body.id)});
            res.status(200).json({
                result: "삭제 완료"
            })
        //}
        // else{
        //     res.status(500).json({
        //         error: "비밀번호 불일치"
        //     })
        // }
=======
        const data = await Comment.findById(ObjectId(commentId));
        console.log(data);
        if (!data) {
            res.status(401).json({
                error : "삭제할 데이터가 없습니다."
            })
        }
        else { 
            let check = await checkCommentPermission(req, res, next);
            console.log(check);
            if(check){
                const data = await Comment.findByIdAndDelete(ObjectId(commentId));
                res.status(200).json({
                message : "삭제 성공"
                })
            }
            else{
                res.status(401).json({
                    message : "작성자가 아닙니다."
                    })
            }
        }
    }
    catch(error : any) {
        res.status(500).json({
            error : error.message
        })
    }
}


const checkCommentPermission = async( req : Request, res : Response, next : NextFunction) => {
    try {
        const { userId, commentId } = req.body;
        const data = await Comment.findById(ObjectId(commentId));
        if(data!.userId.toString() != userId) {
            return false;
        }
        else {
            return true;
        }
>>>>>>> f5fccb3 (임시 커밋)
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const checkCommentPermission = async( req : Request, res : Response, next : NextFunction) => {
    try {
        const { userId, commentId } = req.body;
        const data = await Comment.findById(commentId);
        console.log("commentId로 조회" ,data);
        if(!data) { 
            res.status(400).json({
                error : "잘못된 댓글 번호입니다."
            })
        }
        else if(data.userId != ObjectId(userId)) {
            res.status(200).json({
                data : data
            })
        }
        else {
            res.status(401).json({
                error : "작성자가 아닙니다."
            })
        }
    }
    catch(error : any) {
        res.status(500).json({
            error : error.message
        })
    }
}


export default {
    getAllCommentData,
    addComment,
    deleteComment,
    checkCommentPermission
}