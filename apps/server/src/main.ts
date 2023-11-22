/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import {helloHelper2, HelloResponse} from "@swap/server-api";

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors({
  origin: ['http://localhost:4200','http://localhost:4400']
}))

app.get('/api', (req, res) => {
  const hello: HelloResponse = helloHelper2();
  res.send(hello);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
