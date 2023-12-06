import {Router} from "express";
import {asyncHandler} from "../../utils/handler/async-handler";
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

// search things
thingsController.get(
  "/things",
  asyncHandler(async () => {
    return {
      items: dummyThings
    };
  }),
);

// get thing details
thingsController.get(
  "/things/:thingId",
  asyncHandler(async (req) => {
    const { thingId } = req.params;
    return dummyThings.find(t => t.id === thingId);
  }),
);

// create thing
thingsController.post(
  "/things",
  asyncHandler(async (req) => {
    const details = CreateThingRequestSchema.parse(req.body);
    const thing = {
      id: ""+ (nextId++),
      name: details.name,
      description: details.description,
    }
    dummyThings.push(thing);
    return thing;
  }),
);

// update thing
thingsController.put(
  "/things",
  asyncHandler(async (req) => {
    const details = UpdateThingRequestSchema.parse(req.body);
    const thing = dummyThings.find(t => t.id === details.id);
    thing.name = details.name;
    thing.description = details.description;
    return thing;
  }),
);

// delete thing
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
  }),
);
