import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
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
