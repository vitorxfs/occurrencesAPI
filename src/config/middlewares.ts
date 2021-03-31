import { ApiErrorHandler, Application, LoggerAdapter, LoggerMiddleware } from '@enviabybus/utility-belt';
import express, { Response } from 'express';

export const configBeforeMiddlewares = ({ app, loggerAdapter }: {
  app: Application,
  loggerAdapter: LoggerAdapter,
}): void => {
  app.use(express.json());
  app.use(LoggerMiddleware(loggerAdapter));
};

export const configAfterMiddlewares = ({
  app,
  errorHandler,
}: { app: Application, errorHandler: ApiErrorHandler }):void => {
  app.use((error: Error, _req: any, res: Response, _next: any) => {
    return errorHandler.handle(error, res);
  });
};
