import express from 'express';
import { Application } from '@enviabybus/utility-belt';

export const configBeforeMiddlewares = (app: Application): void => {
  app.use(express.json());
};
