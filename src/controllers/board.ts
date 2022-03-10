import { NextFunction, Request, Response } from "express";
import Board from "../models/board";

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
       
        const searchList = await Board.find( { $or : options });
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
    search
}