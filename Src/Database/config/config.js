/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
// import './env.config';

// const HOST = process.env.MY_HOST || 'localhost';
// const USER = process.env.MY_USER || 'root';
// const PASSWORD = process.env.DB_PSWD || '1178';
// const DB_NAME = process.env.MY_DB || 'forum';
// const DIALECT = process.env.MY_DIALECT || 'mysql';

// export default {
//   HOST,
//   USER,
//   PASSWORD,
//   DB_NAME,
//   DIALECT,
// };
const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: '1178',
    database: 'forum',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        ca: fs.readFileSync(`${__dirname}/mysql-ca-master.crt`),
      },
    },
  },
};
