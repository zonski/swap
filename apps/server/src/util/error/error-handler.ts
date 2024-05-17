import type { ErrorRequestHandler, Response } from "express";
import { createLogger } from "../log/logger";
import {BadRequestError} from "./bad-request-error";
import {UnauthorisedError} from "./unauthorised-error";
import {ForbiddenError} from "./forbidden-error";
import {NotFoundError} from "./not-found-error";

const logger = createLogger("error-handler");

/**
 * Basic implementation of RFC-9457 problem json standard
 * https://datatracker.ietf.org/doc/html/rfc9457
 */
interface Problem {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
}

const sendProblem = (res: Response, problem: Problem) => {
  return res.status(problem.status).contentType("application/problem+json").send(JSON.stringify(problem));
};

const logInfoAndSend = (res: Response, err: Error, status: number, title: string) => {
  logger.info(`${title}: ${err.message}`);
  sendProblem(res, {
    title,
    status,
  });
};

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
  // Delegate to default express error handler if headers already sent
  if (res.headersSent) return next(err);

  // Log known 400 errors as info to avoid noise in the logs
  if (err instanceof BadRequestError) {
    return logInfoAndSend(res, err, 400, "Bad Request");
  }
  if (err instanceof UnauthorisedError) {
    return logInfoAndSend(res, err, 401, "Unauthorised");
  }
  if (err instanceof ForbiddenError) {
    return logInfoAndSend(res, err, 403, "Forbidden");
  }
  if (err instanceof NotFoundError) {
    return logInfoAndSend(res, err, 404, "Not Found");
  }
  logger.error("Unknown error", err);
  sendProblem(res, {
    status: 500,
    title: "Unknown Error",
  });
};
