import {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
} from '../env';

const dbEnvironmentConfig = {
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  seederStorage: 'sequelize',
};

const config = {
  development: dbEnvironmentConfig,
  homolog: dbEnvironmentConfig,
  production: dbEnvironmentConfig,
};

export default config;
module.exports = config;
