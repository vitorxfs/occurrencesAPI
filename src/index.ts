import { Application } from '@enviabybus/utility-belt';
import express from 'express';

import { configBeforeMiddlewares } from './config/middlewares';
import configRoutes from './config/routes';
import { sequelize, sequelizeInit } from './database/models';

sequelizeInit(sequelize);

const app = new Application({ express: express(), name: 'ocurrences-api' });

configBeforeMiddlewares(app);
configRoutes(app, { apiContext: '/api/' });
export default app;
