import { ApiErrorHandler, Application } from '@enviabybus/utility-belt';
import express, { Response } from 'express';

export const configBeforeMiddlewares = (app: Application): void => {
  app.use(express.json());
};

export const configAfterMiddlewares = ({
  app,
  errorHandler,
}: { app: Application, errorHandler: ApiErrorHandler }):void => {
  app.use((error: Error, _req: any, res: Response, _next: any) => {
    return errorHandler.handle(error, res);
  });
};
