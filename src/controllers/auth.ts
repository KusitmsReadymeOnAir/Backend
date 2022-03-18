import { NextFunction, Request, Response } from "express"; 
import { Cookie } from "express-session";
import path from "path";

const loginCallback = async (req : Request, res : Response, next : NextFunction ) => {
    try{
        var aa = req.user;
        res.cookie('user', aa, { sameSite : 'none'});
        res.redirect('http://localhost:3000/logincomplete');
    }
    catch (error : any) {
        res.status(500).json({
            "message": "서버 오류"
        })
    }
}

const logout = async (req : Request, res : Response, next : NextFunction) => {
    try {
        console.log("로그아웃 요청");
        console.log(req.cookies['connect.sid']);
        req.logOut();
        req.session.destroy((err:any) => {
            if(err) {
                console.log(err);
                res.status(500).json({
                    "message": "서버 오류"
                })
            }
            else {
                console.log("쿠키 삭제");
                res.clearCookie('connect.sid').clearCookie('user');
                res.status(200).json({
                    "message" : "로그아웃 성공"
                })
            }
        });
    }
    catch (error : any) {
        res.status(500).json({
            "message": "서버 오류"
        })
    }
}


export default {
    loginCallback,logout
}