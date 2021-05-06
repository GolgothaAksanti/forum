import 'dotenv/config';
import app, { PORT } from './app';

app.listen(PORT, () => {
  process.stdout.write(`server listening on: http://localhost:${PORT}`);
});
