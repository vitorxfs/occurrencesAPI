import {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
} from '../env';

const dotenv = require('dotenv');
dotenv.config();

const config = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
  },
};

export default config;
