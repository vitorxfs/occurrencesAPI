import { Application } from '@enviabybus/utility-belt';
import { OccurrencesApi } from '../api/ocurrences.api';

const configRoutes = (app: Application, { apiContext }: { apiContext: string }): void => {
  app.mount(apiContext, OccurrencesApi());
};

export default configRoutes;
