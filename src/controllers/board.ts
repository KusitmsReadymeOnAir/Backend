import { NextFunction, Request, Response } from "express";
import Board from "../models/board";
import Comment from "../models/comment";
import Counter from "../models/counter";
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
        views:1,
        numId:1,
        imageId : req.body.imageId
    });

    try {
        if(boardData.title ==null || boardData.content ==null || boardData.category ==null ){
            res.status(400).json({
                message : "필수 값 누락"
            })
        }
        else{
            await boardData.save();
            res.status(200).json({
                data : boardData
            })
        }
    }
    catch (error: any) {
        res.status(500).json({
            "message": "서버 오류"
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
            "message": "서버 오류"
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
            "message": "서버 오류"
        })
    }
}

const update = async( req : Request, res : Response, next : NextFunction) => {
    const { userId, boardId, ...content } = req.body;
    console.log(content);

    try {
        const data = await Board.findById(ObjectId(boardId));
        if(!data) {
            res.status(401).json({ error : "업데이트할 데이터가 없습니다." });
        }
        else {
        
            let check = await checkBoardPermission(req, res, next);
            if(check){
                const updatedData = await Board.findByIdAndUpdate({"_id":ObjectId(boardId)}, content, {
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
        const commentShow = await Comment.find({"boardId":ObjectId(id)}).sort('createdAt').populate('userId','name');

        let commentTrees = util.convertToTrees(commentShow, '_id','parentComment','childComments');
        if(show.length ==0){
            res.status(204).json({
                error : "조회할 데이터가 없습니다."
            })
        }
        else{
            let count:any = show[0].views;
            count++;
            const updatedData = await Board.findByIdAndUpdate({"_id":ObjectId(id)}, {"views": count});
            console.log(count);
            console.log(updatedData);
            res.status(200).json({
                board: updatedData,
                comment : commentTrees
            })
        }
    }
    catch (error: any) {
        res.status(500).json({
            "message": "서버 오류"
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
            "message": "서버 오류"
        })
    }
}


const list = async ( req: Request, res: Response, next : NextFunction) => {
    try {
        const allData = await Board.find({}).populate('userId','name').sort({"date" : -1});
        res.status(200).json({
            boardData: allData
        })

    }
    catch (error: any) {
        res.status(500).json({
            "message": "서버 오류"
        })
    }
}

const listByCategory = async ( req: Request, res: Response, next : NextFunction) => {
    let { category } = req.params;
    try {
        const allData = await Board.find({"category" : category}).populate('userId','name').sort({"date" : -1});
        res.status(200).json({
            categoriedData : allData
        })
    }
    catch (error: any) {
        res.status(500).json({
            "message": "서버 오류"
        })
    }
}

const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let options:any[] = [];
        let option = req.query.option;
        let content = req.query.content + '';
        
        if(option == 'writer') {
            const user = await User.find({"name" : content});
            console.log(user[0]);

            const searchList = await Board.find({"userId" : user[0]._id}).populate('userId', 'name').sort({"date" : -1});
            res.status(200).json({
                searchData: searchList
            })
        } else {
            if(option == 'title') {
                options = [{title : new RegExp(content)}];
            } else if (option == 'content') {
                options = [{content  : new RegExp(content)}];
            } else if (option == 'title_content') {
                options = [{title : new RegExp(content)},
                            {content : new RegExp(content)}];
            }

            const searchList = await Board.find( { $or : options }).populate('userId','name').sort({"date" : -1});
            res.status(200).json({
                searchData: searchList
            })
        } 
    } catch (error: any) {
        res.status(500).json({
            "message": "서버 오류"
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
            "message": "서버 오류"
        })
    }
}
}
export default {
    write, imageUpload, list, listByCategory, checkBoardPermission, deleteBoard, update, showBoard, search
}