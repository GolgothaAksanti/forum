/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import app from './src/app/app';

const PORT = 3020;

app.listen(PORT, () => {
  process.stdout.write(`server listening on: http://localhost:${PORT}`);
});
