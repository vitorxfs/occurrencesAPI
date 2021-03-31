import app, { logger } from './index';
import { SERVER_PORT } from './env';

app.express.listen(SERVER_PORT, () => {
  logger.info('App listening on port ' + SERVER_PORT);
});
