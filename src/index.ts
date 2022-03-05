import express from 'express';

class App {
    app: express.Application;

    constructor() {
        this.app = express();
    }
}

const app = new App().app;

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World !');
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(port + '번 포트 실행 중');
});