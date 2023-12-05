import {Handler, NextFunction, Request, Response} from "express";

export type AsyncHandler = (req: Request, res: Response, next?: NextFunction) => Promise<unknown>;

/**
 * Convenience middleware for handling async handler functions.
 * This will NOT call next() for a successful promise (use asyncMiddleware()
 * if you need that functionality)
 * Any errors caught will be passed onto the configured error handling middleware
 * @param handlerFn async handler
 */
export const asyncHandler = (handlerFn: AsyncHandler): Handler =>
  (req, res, next) => {
    handlerFn(req, res, next)
    .then(value => res.json(value))
    .catch((error) => next(error));
  }
