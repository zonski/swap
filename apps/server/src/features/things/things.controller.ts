import {Router} from "express";
import {asyncHandler} from "../../utils/async-handler";
import {Thing} from "@swap/server-api";

export const thingsController = Router();

const dummyThings: Thing[] = [
  {
    id: "1",
    name: "Thing 1",
    description: "These things are good things",
  }, {
    id: "2",
    name: "Thing 2",
    description: "These things will not bite",
  }
];

thingsController.get(
  "/things",
  asyncHandler(async (req, res) => {
    res.json({
      results: dummyThings
    });
  }),
);

thingsController.get(
  "/things/:thingId",
  asyncHandler(async (req, res) => {
    const { thingId } = req.params;
    const thing = dummyThings.find(t => t.id === thingId);
    res.json(thing);
  }),
);
