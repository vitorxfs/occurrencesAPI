import { AppRequest, Authenticator, AuthenticatorHttpBearerSecurityScheme, HttpClientAdapter } from '@enviabybus/utility-belt';
import { NextFunction, RequestHandler, Response } from 'express';

import { getGandalfClient } from '../initializers';

const extractAuthorizationToken = (authorization: string) => {
  return authorization.replace('Bearer ', '');
};

export class UserAuthenticator extends Authenticator {
  host: string;
  httpClientAdapter: HttpClientAdapter;
  id = 'BearerAuth';

  scheme: AuthenticatorHttpBearerSecurityScheme = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: `### [Esquema Bearer de autenticação](https://tools.ietf.org/html/rfc6750)
    Para usuários utilize o token gerado no serviço de autenticação Gandalf e para serviços
    utilize o token passado pelo administradores do sistema.
    `,
  };

  constructor({
    host,
    httpClientAdapter,
  }: {
    host: string,
    httpClientAdapter: HttpClientAdapter,
  }) {
    super();
    this.host = host;
    this.httpClientAdapter = httpClientAdapter;
  }

  get middleware(): RequestHandler {
    const middleware = async (req: AppRequest, res: Response, next: NextFunction): Promise<void> => {
      const authorization = req.headers.authorization;
      if (!authorization) {
        res.status(400).json({ message: 'Missing Authorization Header' });
        return;
      };

      const token = extractAuthorizationToken(authorization);
      const gandalfClient = getGandalfClient();
      try {
        await gandalfClient.me(token);
        next();
      } catch (error) {
        if (error.code === 'gandalf_unauthorized_error') {
          res.status(401).json({ message: 'Invalid Authorization Token' });
        } else {
          res.status(500).end();
        }
      }
    };
    return middleware;
  }
}
