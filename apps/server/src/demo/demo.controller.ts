import {Router} from "express";
import type {DemoMessage} from "@repo/logger";
import {asyncHandler} from "../util/route/async-handler.js";
import {createDemoMessage3x} from "@repo/logger";

export const demoController = Router();

demoController.get(
  "/",
  asyncHandler(async () => {
    const demoMessage: DemoMessage = createDemoMessage3x("Testing");
    return demoMessage;
  }),
);
