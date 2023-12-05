import {z} from "zod";
import {PagedRequestSchema, PagedResults} from "./pagination";

export const ThingSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
})
export type Thing = z.infer<typeof ThingSchema>;

export const SearchThingsRequestSchema = PagedRequestSchema.extend({
  // todo search criteria
})
export type SearchThingsRequest = z.infer<typeof SearchThingsRequestSchema>;

export type SearchThingsResponse = PagedResults<Thing>;

export const CreateThingRequestSchema = ThingSchema.pick({
  name: true,
  description: true
});
export type CreateThingRequest = z.infer<typeof CreateThingRequestSchema>;

export const UpdateThingRequestSchema = ThingSchema.pick({
  id: true,
  name: true,
  description: true
});
export type UpdateThingRequest = z.infer<typeof UpdateThingRequestSchema>;
