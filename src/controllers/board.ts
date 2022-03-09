import { NextFunction, Request, Response } from "express";
import Board from "../models/board";

const write = async (req: Request, res: Response, next: NextFunction) => {
    const boardData = new Board({
        title : req.body.title,
        content : req.body.content,
        category : req.body.category, 
        writer : req.body.writer,
        pw : req.body.pw,
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

const list = async ( req: Request, res: Response, next : NextFunction) => {
    try {
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


export default {
    write, imageUpload, list, listByCategory
}