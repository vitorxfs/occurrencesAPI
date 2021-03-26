import { Application } from '@enviabybus/utility-belt';
import express from 'express';

export const configBeforeMiddlewares = (app: Application): void => {
  app.use(express.json());
};
