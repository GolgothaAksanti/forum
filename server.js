/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import 'dotenv/config';
import app from './src/app/app';

const PORT = process.env.PORT || 3020;

app.listen(PORT, () => {
  process.stdout.write(`server listening on: http://localhost:${PORT}`);
});
