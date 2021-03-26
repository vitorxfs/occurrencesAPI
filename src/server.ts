import app from './index';
import { SERVER_PORT } from './env';

app.express.listen(SERVER_PORT, () => {
  console.log('App listening on port ' + SERVER_PORT);
});
