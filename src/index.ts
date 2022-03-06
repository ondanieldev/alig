import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { errors as celebrateErrorHandler } from 'celebrate';

import routes from './routes/index.routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(routes);
app.use(celebrateErrorHandler());

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
