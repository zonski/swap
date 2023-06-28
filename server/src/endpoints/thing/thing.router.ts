import express from "express";
import {createThing, getThing, listThings} from "./thing.service";
import {validateAccessToken} from "../../util/auth0/auth0.middleware";
import {getQueryParam} from "../../util/express/get-query-param";
import {CreateThingRequest} from "@swap/common";

export const thingRouter = express.Router();

// list things
thingRouter.get('',
  validateAccessToken,
  async (req, res, next) => {
    try {
      const things = await listThings();
      res.send(things);
    } catch (e) {
      next(e)
    }
  });

// search things
thingRouter.post('/search',
  validateAccessToken,
  async (req, res, next) => {
    try {
      const things = await listThings();
      res.send(things);
    } catch (e) {
      next(e)
    }
  });

// get thing by ID
thingRouter.get('/:id',
  validateAccessToken,
  async (req, res, next) => {
    try {
      const id = +getQueryParam(req, 'id');
      const thing = await getThing(id);
      res.send(thing);
    } catch (e) {
      next(e)
    }
  });

// create thing
thingRouter.post('',
  validateAccessToken,
  async (req, res, next) => {
    try {
      const thing = await createThing(req.body as CreateThingRequest);
      res.send(thing);
    } catch (e) {
      next(e)
    }
  });

