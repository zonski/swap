import {Request} from "express-serve-static-core";

export const getCurrentAuth0UserId = (req: Request): string => {
  return req.auth?.payload.sub as string;
}