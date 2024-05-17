import { Router } from "express";
import {thingsController} from "./features/things/things.controller";

export const apiRouter = Router();

apiRouter.use("/things", thingsController);
