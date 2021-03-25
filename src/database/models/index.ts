import { Sequelize } from 'sequelize';

import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_USER,
} from '../../env.js';

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
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
