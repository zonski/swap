import type { Server } from "node:http";
import type { Express } from "express";
import { getConfig } from "./config.js";
import {createLogger} from "./util/log/logger";
import {createServer} from "./server";

const logger = createLogger("main-startup");

const startServer = (app: Express): Server => {
  const port = getConfig().port;
  const server = app.listen(port, () => {
    logger.info(`Listening at http://localhost:${port}`);
  });
  server.on("error", (err) => logger.error(err));

  // Gracefully handle cloud providers trying to shut down servers
  process.on("SIGTERM", () => {
    logger.info("SIGTERM received: stopping server");
    server.close(() => {
      logger.info("Server stopped");
    });
  });

  return server;
};

process.on("uncaughtException", (err) => {
  logger.error(err.stack);
  logger.info("Node NOT exiting after error...");
});

startServer(createServer());
