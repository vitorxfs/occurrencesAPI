require('dotenv').config();
import app from './index';

const PORT = process.env.SERVER_PORT || 3000;

app.express.listen(process.env.SERVER_PORT, () => {
  console.log('App listening on port ' + PORT);
});
