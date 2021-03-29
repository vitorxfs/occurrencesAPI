import { AppRequest, AppRouter } from '@enviabybus/utility-belt';
import express from 'express';
import Joi from 'joi';

import { getOccurrencesService, getUserAuthenticator } from '../initializers';

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
      const occurrencesService = getOccurrencesService();
      try {
        const result = await occurrencesService.create({ description, code, registeredAt });

        res.status(201).json(result);
      } catch (error) {
        res.status(500).send('Internal Server Error');
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
      const occurrencesService = getOccurrencesService();
      try {
        const result = await occurrencesService.list();
        res.json(result);
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
    },
  );
  return appRouter;
};
