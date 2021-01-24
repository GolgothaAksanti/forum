/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';
import './env.config';

const PORT = process.env.MY_PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`server listening on: http://localhost:${PORT}`);
});
