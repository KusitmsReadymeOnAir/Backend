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

const logout = async (req : Request, res : Response, next : NextFunction) => {
    try {
        console.log("로그아웃 요청");
        req.logOut();
        req.session.destroy((err:any) => {
            if(err) {
                console.log(err);
            }
            else {
                res.clearCookie('user');
                console.log("쿠키 삭제");
                res.redirect('http://localhost:3000');
            }
        });
    }
    catch (error : any) {
        res.status(500).json({
            error : error.message
        })
    }
}


export default {
    loginCallback,logout
}