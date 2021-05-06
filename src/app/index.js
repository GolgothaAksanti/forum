import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

import MyRouter from './routes';
import port from './helpers/portUtil';

const app = express();
const isProd = process.env.NOD_ENV === 'production';
const logStream = fs.createWriteStream('combine.log', { flags: 'a' });

app.use(cors());
app.use(
  morgan(isProd ? 'combined' : 'dev', {
    stream: isProd ? logStream : null,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MyRouter.run(app);

export const PORT = port;
export default app;
