import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import MyRouter from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MyRouter.run(app);

export default app;
