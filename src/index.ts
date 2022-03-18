import express from 'express';
import session from 'express-session';
import cors from "cors";
import passport, { authorize } from 'passport';
import config from './config/config';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import boardRoutes from "./routes/board"
import commentRoutes from "./routes/comment"
import authRoutes from "./routes/auth"
import mypageRoutes from "./routes/user"
var cookieParser = require('cookie-parser'); 

const app = express();
const dbURL = config.dbURL || "";
app.use(express.json());

app.use(cors({
    origin : true,
    credentials : true,
}));

app.set("trust proxy",1);
app.use(session({
    store : mongoStore.create({
        mongoUrl : dbURL
    }),
    secret : 'MySecret', 
    resave : false, saveUninitialized : false,
    cookie : {
        sameSite : "none",
        secure : false
    }
}));

// Passport setting

app.use(passport.initialize());
app.use(passport.session());



app.use(cookieParser());


mongoose
    .connect(dbURL, {
    })
    .then(() => {
        console.log("connected MongoDB")
    })
    .catch((error) => {
        console.log(error.message)
    });


// Routes
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World !');
});

app.use("/board", boardRoutes);
app.use('/comment', commentRoutes);
app.use('/auth', authRoutes);
app.use('/mypage', mypageRoutes);


// Post setting
var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(port + '번 포트 실행 중');
});

