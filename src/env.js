const dotenv = require('dotenv');
dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const SERVER_PORT = process.env.SERVER_PORT;
export const DB_NAME = process.env.DB_NAME || 'occurrences_api';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASS = process.env.DB_PASS || null;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
export const DB_PORT = +process.env.DB_PORT || 3306;
