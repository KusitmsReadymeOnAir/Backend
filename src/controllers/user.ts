import { NextFunction, Request, Response } from "express";
import Board from "../models/board";
import Comment from "../models/comment";
import User from "../models/user";

const ObjectId = require('mongoose').Types.ObjectId;

// 사용자 정보 가져오기
const userInfo = async ( req : Request, res : Response, next : NextFunction) => {
    let { id } = req.params;
    console.log(id);
    try {
        const data = await User.find( {"_id":ObjectId(id)} );
        res.status(200).json({
            userData: data
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

// 사용자 게시물 가져오기
const userBoard = async ( req : Request, res : Response, next : NextFunction) => {
    let { id } = req.params;
    console.log(id);
    try {
        const boardList = await Board.find( { "userId" : ObjectId(id)});
        res.status(200).json({
            boardData: boardList
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

// 사용자 댓글 가져오기
const userComment = async ( req : Request, res : Response, next : NextFunction) => {
    let { id } = req.params;
    console.log(id);
    try {
        const commentList = await Comment.find( { "userId" : ObjectId(id)});
        res.status(200).json({
            commentData: commentList
        })
    }
    catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}

export default {
    userInfo,
    userBoard,
    userComment
}