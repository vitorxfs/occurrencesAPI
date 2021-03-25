const dotenv = require('dotenv');
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_HOST = process.env.DB_HOST;
export const DB_DIALECT = process.env.DB_DIALECT;
export const NODE_ENV = process.env.NODE_ENV || 'development';
