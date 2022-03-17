import express from 'express';
import session from 'express-session';
import cors from "cors";
import passport, { authorize } from 'passport';
import config from './config/config';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import testRoutes from "./routes/test"
import boardRoutes from "./routes/board"
import commentRoutes from "./routes/comment"
import authRoutes from "./routes/auth"
import mypageRoutes from "./routes/user"

// declare module 'express-session' {
//     export interface SessionData {
//         user : string;
//     }
// }

const dbURL = config.dbURL || "";

const app = express();
app.use(express.json());
app.use(session({
    store : mongoStore.create({
        mongoUrl : dbURL
    }),
    secret : 'MySecret', resave : false, saveUninitialized : false
}));

// Passport setting
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true,
}));

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

app.use("/test", testRoutes);
app.use("/board", boardRoutes);
app.use('/comment', commentRoutes);
app.use('/auth', authRoutes);
app.use('/mypage', mypageRoutes);



// Post setting
var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(port + '번 포트 실행 중');
});

