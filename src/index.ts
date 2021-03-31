import { Application } from '@enviabybus/utility-belt';
import express from 'express';

import { configAfterMiddlewares, configBeforeMiddlewares } from './config/middlewares';
import configRoutes from './config/routes';
import { getApiErrorHandler, getLogger, getLoggerAdapter } from './initializers';
import { sequelize, sequelizeInit } from './database/models';

export const logger = getLogger();
const errorHandler = getApiErrorHandler({ logger });
sequelizeInit(sequelize);

const app = new Application({ express: express(), name: 'ocurrences-api' });

configBeforeMiddlewares({
  app,
  loggerAdapter: getLoggerAdapter(),
});
configRoutes(app, { apiContext: '/api/' });
configAfterMiddlewares({ app, errorHandler });

export default app;
