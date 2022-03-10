import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import testRoutes from "./routes/test"
import boardRoutes from "./routes/board"

const app = express();
app.use(express.json());

const dbURL = config.dbURL || "";
mongoose
    .connect(dbURL, {
    })
    .then(() => {
        console.log("connected MongoDB")
    })
    .catch((error) => {
        console.log(error.message)
    });

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World !');
});

app.use("/test", testRoutes);
app.use("/board", boardRoutes);


var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(port + '번 포트 실행 중');
});