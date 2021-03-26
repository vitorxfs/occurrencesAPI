import { Sequelize } from 'sequelize';

import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
} from '../../env.js';

const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT as any,
  },
);

// Inicializa os sequelize models
function sequelizeInit(sequelize: Sequelize) {
  const Occurrences = require('./occurrences');
  Occurrences.init(sequelize);
}

export { Occurrences } from './occurrences';

export {
  sequelize,
  sequelizeInit,
};
