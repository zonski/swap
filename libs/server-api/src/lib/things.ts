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
