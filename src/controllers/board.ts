import { NextFunction, Request, Response } from "express";
import Board from "../models/board";
import Comment from "../models/comment";
import User from "../models/user";
var util = require('../util');

const ObjectId = require('mongoose').Types.ObjectId;

const write = async (req: Request, res: Response, next: NextFunction) => {   
    const boardData = new Board({
        title : req.body.title,
        content : req.body.content,
        category : req.body.category, 
        userId : req.body.userId,
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
        console.log(req.file);
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
        const data = await Board.findById(boardId);
        console.log("보드아이디로 조회" ,data);
        if(!data) { 
            res.status(400).json({
                error : "잘못된 게시글 번호입니다."
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

const update = async( req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;

    // if(!await Board.findById(id)) {
    //     res.status(400).json({ error : "존재하지 않는 게시글 ID 입니다."});
    //     return ;
    // }

    try {
        const updatedData = await Board.findByIdAndUpdate(id, req.body, {
            new : true
        });
        if(!updatedData) {
            res.status(401).json({ error : "업데이트할 데이터가 없습니다." });
        }
        else {
            res.status(200).json({
                data : updatedData
            })
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

        console.log(show);
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
    const { id } = req.params;

    try {
        const data = await Board.findByIdAndDelete(id);
        if (!data) {
            res.status(401).json({
                error : "삭제할 데이터가 없습니다."
            })
        }
        else { 
            res.status(200).json({
            message : "삭제 성공"
            })
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
        console.log("리스트 요청 들어옴");
        const allData = await Board.find({})
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
        const allData = await Board.find({"category" : category})
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

        console.log(req.query.content);
        
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
       
        const searchList = await Board.find( { $or : options }).sort({"date" : -1});
        res.status(200).json({
            searchData: searchList
        })
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}
export default {
    write, imageUpload, list, listByCategory, checkBoardPermission, deleteBoard, update, showBoard, search
}