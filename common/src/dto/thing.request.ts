import { z } from "zod";

export const CreateThingSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export type CreateThingRequest = z.infer<typeof CreateThingSchema>;

export const SearchThingSchema = z.object({
  keywords: z.string().optional(),
});

export type SearchThingRequest = z.infer<typeof SearchThingSchema>;
