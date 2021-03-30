import { AppRequest, AppRouter } from '@enviabybus/utility-belt';
import express from 'express';
import Joi from 'joi';

import { getApiErrorHandler, getLogger, getOccurrenceService, getUserAuthenticator } from '../initializers';
import { OccurrenceRepositoryNotFoundError } from '../errors/repositories/occurrences-repository.error';

export const OccurrencesApi = () => {
  const appRouter = new AppRouter(express.Router());
  const ROUTE = '/occurrences';
  const userAuthenticator = getUserAuthenticator();

  // POST /occurrences
  appRouter.post(
    ROUTE,
    {
      auth: userAuthenticator,
      requestSchema: {
        body: Joi.object({
          description: Joi.string().required(),
          code: Joi.string().required(),
          registeredAt: Joi.date().iso().required(),
        }),
      },
      responseSchema: {
        201: Joi.object({
          id: Joi.number().required(),
          description: Joi.string().required(),
          code: Joi.string().required(),
          registeredAt: Joi.date().iso().required(),
        }).description('Created'),
      },
      summary: 'Criação de Ocorrência',
    },
    async (req: AppRequest, res) => {
      const {
        description,
        code,
        registeredAt,
      } = req.body;
      const logger = getLogger();
      const apiErrorHandler = getApiErrorHandler({ logger });
      const occurrenceService = getOccurrenceService();
      try {
        const result = await occurrenceService.create({ description, code, registeredAt });

        res.status(201).json(result);
      } catch (error) {
        apiErrorHandler.handle(error, res);
      }
    },
  );

  // GET /occurrences
  appRouter.get(
    ROUTE,
    {
      auth: userAuthenticator,
      responseSchema: {
        200: Joi.array().items({
          id: Joi.number().required(),
          description: Joi.string().required(),
          code: Joi.string().required(),
          registeredAt: Joi.date().iso().required(),
        }),
      },
      summary: 'Listagem de Ocorrências',
    },
    async (req: AppRequest, res): Promise<void> => {
      const logger = getLogger();
      const apiErrorHandler = getApiErrorHandler({ logger });
      const occurrenceService = getOccurrenceService();
      try {
        const result = await occurrenceService.list();
        res.json(result);
      } catch (error) {
        apiErrorHandler.handle(error, res);
      }
    },
  );

  // GET /occurrences/:id
  appRouter.get(
    `${ROUTE}/:id`,
    {
      auth: userAuthenticator,
      responseSchema: {
        200: Joi.object({
          id: Joi.number().required(),
          description: Joi.string().required(),
          code: Joi.string().required(),
          registeredAt: Joi.date().iso().required(),
        }).description('Created'),
      },
      summary: 'Detalhes de Ocorrência',
    },
    async (req: AppRequest, res) => {
      const id = req.params.id;
      const logger = getLogger();
      const apiErrorHandler = getApiErrorHandler({ logger });
      const occurrenceService = getOccurrenceService();
      try {
        const result = await occurrenceService.findById(Number(id));
        res.json(result);
      } catch (error) {
        if (error instanceof OccurrenceRepositoryNotFoundError) {
          apiErrorHandler.handle(error, res, 404);
        } else {
          apiErrorHandler.handle(error, res);
        }
      }
    },
  );

  // PATCH /occurrences/:id
  appRouter.patch(
    `${ROUTE}/:id`,
    {
      auth: userAuthenticator,
      requestSchema: {
        body: Joi.object({
          description: Joi.string(),
          code: Joi.string(),
          registeredAt: Joi.date().iso(),
        }).min(1),
      },
      summary: 'Atualização de Ocorrência',
    },
    async (req: AppRequest, res) => {
      const id = req.params.id;
      const {
        description,
        code,
        registeredAt,
      } = req.body;
      const logger = getLogger();
      const apiErrorHandler = getApiErrorHandler({ logger });
      const occurrenceService = getOccurrenceService();
      try {
        await occurrenceService.update(+id, {
          description,
          code,
          registeredAt,
        });
        res.sendStatus(204);
      } catch (error) {
        if (error instanceof OccurrenceRepositoryNotFoundError) {
          apiErrorHandler.handle(error, res, 404);
        } else {
          apiErrorHandler.handle(error, res);
        }
      }
    },
  );

  // DELETE /occurrences/:id
  appRouter.delete(
    `${ROUTE}/:id`,
    {
      auth: userAuthenticator,
      summary: 'Deleção de Ocorrência',
    },
    async (req: AppRequest, res) => {
      const id = req.params.id;
      const logger = getLogger();
      const apiErrorHandler = getApiErrorHandler({ logger });
      const occurrenceService = getOccurrenceService();
      try {
        await occurrenceService.destroy(+id);
        res.status(204).end();
      } catch (error) {
        if (error instanceof OccurrenceRepositoryNotFoundError) {
          apiErrorHandler.handle(error, res, 404);
        } else {
          apiErrorHandler.handle(error, res);
        }
      }
    },
  );

  return appRouter;
};
