import { Router } from "express";
import {demoController} from "./demo/demo.controller.js";

export const apiRouter = Router();

apiRouter.use("/demo", demoController);
