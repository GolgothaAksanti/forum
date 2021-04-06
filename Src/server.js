import 'dotenv/config';
import app from './app/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  process.stdout.write(`server listening on: http://localhost:${PORT}`);
});
