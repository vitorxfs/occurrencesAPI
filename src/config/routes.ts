import { Application, DocsApi } from '@enviabybus/utility-belt';

import { OccurrencesApi } from '../api/ocurrences.api';

const configRoutes = (app: Application, { apiContext }: { apiContext: string }): void => {
  app.mount(apiContext, OccurrencesApi());
  app.use(DocsApi(app));
};

export default configRoutes;
