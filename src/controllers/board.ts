import { NextFunction, Request, Response } from "express";
import Board from "../models/board";
import Comment from "../models/comment";
import User from "../models/user";
var util = require('../util');

const ObjectId = require('mongoose').Types.ObjectId;

const write = async (req: Request, res: Response, next: NextFunction) => {   
    const user = req.body.userId;
    const boardData = new Board({
        title : req.body.title,
        content : req.body.content,
        category : req.body.category, 
        userId : ObjectId(user),
        imageId : req.body.imageId
    });

    try {
        await boardData.save();
        res.status(200).json({
            // result: "게시글 저장 완료",
            data : boardData
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const imageUpload = async( req : Request, res : Response, next : NextFunction) => {
    try {
        var url = (req.file as Express.MulterS3.File).location;
        res.status(200).json({
            data : url
        })
    }
    catch(error : any) {
        res.status(500).json({
            error : error.message
        })
    }
}

const checkBoardPermission = async( req : Request, res : Response, next : NextFunction) => {
    try {
        const { userId, boardId } = req.body;
        const data = await Board.findById(ObjectId(boardId));
        if(data!.userId.toString() != userId) {
            return false;
        }
        else {
            return true;
        }
    }
    catch(error : any) {
        res.status(500).json({
            error : error.message
        })
    }
}

const update = async( req : Request, res : Response, next : NextFunction) => {
    const { userId, boardId, content } = req.body;

    // if(!await Board.findById(id)) {
    //     res.status(400).json({ error : "존재하지 않는 게시글 ID 입니다."});
    //     return ;
    // }

    try {
        const data = await Board.findById(ObjectId(boardId));
        if(!data) {
            res.status(401).json({ error : "업데이트할 데이터가 없습니다." });
        }
        else {
        
            let check = await checkBoardPermission(req, res, next);
            if(check){
                const updatedData = await Board.findByIdAndUpdate({"_id":ObjectId(boardId)}, {content:content}, {
                    new : true
                });
                res.status(200).json({
                message : "업데이트 성공"
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

const showBoard = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    
    try {
        const show = await Board.find({"_id":ObjectId(id)}).populate('userId','name');
        const commentShow = await Comment.find({"boardId":ObjectId(id)}).sort('createdAt').populate('userId','name');;
        // let userId = show[0].userId;

        // User.find({googleId:userId}).populate('tiles.bonusId')

        let commentTrees = util.convertToTrees(commentShow, '_id','parentComment','childComments');  
        res.status(200).json({
            board: show,
            comment : commentTrees
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}


const deleteBoard = async( req : Request, res : Response, next : NextFunction) => {
    const { userId, boardId } = req.body;

    try {
        const data = await Board.findById(ObjectId(boardId));
        if (!data) {
            res.status(401).json({
                error : "삭제할 데이터가 없습니다."
            })
        }
        else { 
            let check = await checkBoardPermission(req, res, next);
            if(check){
                const data = await Board.findByIdAndDelete(ObjectId(boardId));
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


const list = async ( req: Request, res: Response, next : NextFunction) => {
    try {
        const allData = await Board.find({}).populate('userId','name');
        res.status(200).json({
            boardData: allData
        })

    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const listByCategory = async ( req: Request, res: Response, next : NextFunction) => {
    let { category } = req.params;
    try {
        const allData = await Board.find({"category" : category}).populate('userId','name');
        res.status(200).json({
            categoriedData : allData
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let options = [];
        let option = req.query.option;
        
        if(option == 'writer') {
            options = [ { writer : req.query.content} ];
        }
        else if(option == 'title') {
            options = [{title : new RegExp('' + req.query.content)}];
        } else if (option == 'content') {
            options = [{content  : new RegExp('' + req.query.content)}];
        } else if (option == 'title_content') {
            options = [{title : new RegExp('' + req.query.content)},
                        {content : new RegExp('' + req.query.content)}];
        } else {
            const err = new Error('검색 옵션이 없습니다.')   
            throw err
        }
       
        const searchList = await Board.find( { $or : options }).sort({"date" : -1}).populate('userId','name');
        res.status(200).json({
            searchData: searchList
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
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
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}
}
export default {
    write, imageUpload, list, listByCategory, checkBoardPermission, deleteBoard, update, showBoard, search
}