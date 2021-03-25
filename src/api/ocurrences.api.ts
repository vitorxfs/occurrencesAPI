import { AppRequest, AppRouter } from '@enviabybus/utility-belt';
import express from 'express';
import Joi from 'joi';

import { getOccurrencesService } from '../initializers';

export const OccurrencesApi = () => {
  const appRouter = new AppRouter(express.Router());
  const ROUTE = '/occurrences';

  // POST /occurrences
  appRouter.post(
    ROUTE,
    {
      auth: null,
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
        throw new Error(error);
      }
    },
  );
  return appRouter;
};
