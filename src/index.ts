import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import testRoutes from "./routes/test"

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
    })

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World !');
});

app.get('/test', (req: express.Request, res: express.Response) => {
    res.send('커밋 테스트');
});

app.use("/test", testRoutes);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(port + '번 포트 실행 중');
});