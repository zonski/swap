import express, { type Express, json } from "express";
import cors from "cors";
import helmet from "helmet";
import { handleError } from "./util/error/error-handler.js";
import { routeNotFound } from "./util/route/route-not-found.js";
import { getConfig } from "./config.js";
import {createLogger} from "./util/log/logger";
import {apiRouter} from "./routes.ts";

const logger = createLogger("app-init");

export const createServer = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: getConfig().allowedCorsUrls, credentials: true }));
  app.use(json({ limit: "15mb" }));

  app.use("/api", apiRouter);

  app.use(routeNotFound());
  app.use(handleError);
  logger.info("Application initialised");
  return app;
};
