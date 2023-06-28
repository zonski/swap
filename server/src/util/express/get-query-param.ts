import {Request} from "express";

export const getQueryParam = (req: Request, name: string) => {
  const value = req.query && req.query[name] ? req.query[name] : null;
  if (!value) {
    throw new Error(`Query parameter "${name}" must be provided`);
  }
  return value;
}