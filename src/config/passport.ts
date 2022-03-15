import passport from 'passport';
import User from "../models/user";
import googlePassport from "passport-google-oauth2";
import { String } from 'aws-sdk/clients/acm';
import config from './config';
const GoogleStrategy = googlePassport.Strategy;
import { Request } from "express";

//serializeUser : 로그인 / 회원가입 후 1회 실행
passport.serializeUser( (user: Express.User, done: (err: any, id?: unknown)=>void ) => {
    done(null, user);
});

//deserializeUser : 로그인 전환시 마다 실행
passport.deserializeUser( (user: Express.User, done: (err: any, id?: unknown)=>void ) => {
    done(null, user);
});

passport.use(new GoogleStrategy(
    {
        clientID      : config.GOOGLE_CLIENT_ID as string,
        clientSecret  : config.GOOGLE_SECRET as string,
        callbackURL   : '/auth/loginCallback',
        passReqToCallback   : true
    }, async ( req : Request, accessToken : String, refreshToken : String , profile : any, done : googlePassport.VerifyCallback) => {
        try {
            console.log('profile : ', profile);
            var id = profile.id;
            var data = await User.findOne({ googleId : id});

            if(!data) {
                console.log("db에 없음");
                const newUser = new User({
                    googleId : profile.id,
                    name : profile.displayName,
                    email : profile.email
                });
                await newUser.save();
                return done(null, newUser);
            }
            else {
                done(null, data);
            }
        }
        catch(err) {
            return done(err,null);
        }
    }
))

export default passport;