import * as dotenv from 'dotenv';

dotenv.config();

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');

export default port;
