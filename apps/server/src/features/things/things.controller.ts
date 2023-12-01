import {Router} from "express";
import {asyncHandler} from "../../utils/async-handler";
import {CreateThingRequestSchema, Thing, UpdateThingRequestSchema} from "@swap/server-api";

export const thingsController = Router();

let nextId = 1;

const dummyThings: Thing[] = [
  {
    id: ""+ (nextId++),
    name: "Thing 1",
    description: "These things are good things",
  }, {
    id: ""+ (nextId++),
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

thingsController.post(
  "/things",
  asyncHandler(async (req, res) => {
    const details = CreateThingRequestSchema.parse(req.body);
    const thing = {
      id: ""+ (nextId++),
      name: details.name,
      description: details.description,
    }
    dummyThings.push(thing);
    res.json(thing);
  }),
);

thingsController.put(
  "/things",
  asyncHandler(async (req, res) => {
    const details = UpdateThingRequestSchema.parse(req.body);
    const thing = dummyThings.find(t => t.id === details.id);
    thing.name = details.name;
    thing.description = details.description;
    res.json(thing);
  }),
);

thingsController.delete(
  "/things/:thingId",
  asyncHandler(async (req, res) => {
    const { thingId } = req.params;
    const index = dummyThings.findIndex(t => t.id === thingId);
    if (index >= 0) {
      const thing = dummyThings[index];
      dummyThings.splice(index, 1);
      res.json(thing);
    }
    res.json({});
  }),
);
