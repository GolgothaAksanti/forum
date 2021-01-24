/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express, { json } from 'express';
import morgan from 'morgan';

// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());

export default app;
