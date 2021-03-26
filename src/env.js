const path = require('path');
require('dotenv').config({ path: path.resolve('__dirname', '../.env.dev') });

export const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_NAME = process.env.DB_NAME || 'occurrences_api';
export const DB_PASS = process.env.DB_PASS || undefined;
export const DB_PORT = +process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const GANDALF_HOST = process.env.GANDALF_HOST || 'https://ebb-hmg-gandalf-hibu25qtaa-ue.a.run.app';
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
