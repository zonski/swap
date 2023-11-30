import {PagedRequest, PagedResults} from "./pagination";

export interface Thing {
  id: string;
  name: string;
  description?: string;
}

export interface SearchThingsRequest extends PagedRequest {
}

export interface SearchThingsResponse extends PagedResults<Thing> {
}

export type CreateThingRequest = Pick<Thing, "name" | "description">

export type UpdateThingRequest = CreateThingRequest & Pick<Thing, "id">;
