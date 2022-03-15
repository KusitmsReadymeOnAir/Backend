import { NextFunction, Request, Response } from "express"; 

const loginCallback = async (req : Request, res : Response, next : NextFunction ) => {
    try{
        console.log("여기는 들어옴");
        console.log("user" , req.user);
        var aa = req.user;
        res.cookie('user', aa);
        res.redirect('http://localhost:3000');
    }
    catch (error : any) {
        res.status(500).json({
            error : error.message
        })
    }
}


export default {
    loginCallback
}