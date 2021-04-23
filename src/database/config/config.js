/* eslint-disable quotes */
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER_DEV,
    password: "",
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: process.env.DB_DIALECT_DEV,
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD_TEST,
    database: 'forum_test',
    host: process.env.DB_HOST_TEST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: process.env.DB_DIALECT_PROD,
  },
};
