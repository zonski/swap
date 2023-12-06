/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, {Router} from 'express';
import * as path from 'path';
import cors from 'cors';
import {thingsController} from "./features/things/things.controller";
import {config} from "./config";
import {errorHandler} from "./utils/error/error-handler";

const app = express();

const corsUrls = config.allowedCorsUrls.split(',');
app.use(cors({
  origin: corsUrls
}))
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json({ limit: "15mb" }));

const apiRouter = Router()
apiRouter.use(thingsController);
app.use('/api', apiRouter);

app.use(errorHandler);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
