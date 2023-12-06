import {ErrorRequestHandler, Request, Response} from "express";
import {ApiError} from "@swap/server-api";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Delegate to default express error handler if headers already sent
  if (res.headersSent) return next(err);

  logError(req, err);

  if (err instanceof ApiError) {
    return errorResponse(res, err);
  }
  return errorResponse(res, { status: 500, code: "server.error", message: err.message ?? "Unexpected server error" });
};

const errorResponse = (res: Response, { status, code, message, extra }: ErrorBody) => {
  return res.status(status).json({ status, code, message, extra });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logError = (req: Request, err: any) => {
  const userId = undefined; // todo: req.jwtDecoded?.userId;
  console.log(`API Error for ${req.method} ${req.path} [${userId ? `userId=${userId}` : "unauthenticated"}]: `, err);
};

export interface ErrorBody {
  readonly status: number;
  readonly code: string;
  readonly message: string;
  readonly extra?: unknown;
}

