import asyncHooks from "async_hooks";
import {Request, Response} from "express";
import {NextFunction} from "express-serve-static-core";

const store = new Map();

const asyncHook = asyncHooks.createHook({
  init: (asyncId, _, triggerAsyncId) => {
    if (store.has(triggerAsyncId)) {
      store.set(asyncId, store.get(triggerAsyncId))
    }
  },
  destroy: (asyncId) => {
    if (store.has(asyncId)) {
      store.delete(asyncId);
    }
  }
});

asyncHook.enable();

export const setRequestContext = (request: Request, response: Response, next: NextFunction) => {
  store.set(asyncHooks.executionAsyncId(), request);
  next();
}

export const getRequestContext = () => {
  return store.get(asyncHooks.executionAsyncId());
};

