/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
