import { AppRequest } from '@enviabybus/utility-belt';
import { NextFunction, Response } from 'express';

import { getGandalfClient } from '../initializers';

const extractAuthorizationToken = (authorization: string) => {
  return authorization.replace('Bearer ', '');
};

export const UserAuthenticatorMiddleware = () => {
  const middleware = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
    const authorization = req.headers.authorization;
    if (!authorization) throw new Error('Missing Authorization Header');

    const token = extractAuthorizationToken(authorization);
    const gandalfClient = getGandalfClient();
    try {
      await gandalfClient.me(token);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid Authentication Token' });
    }
  };
  return middleware;
};
