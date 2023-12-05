import {z} from "zod";

export const PagedRequestSchema = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
});
export type PagedRequest = z.infer<typeof PagedRequestSchema>;

export function createPagedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType,
) {
  return z.object({
    pageIndex: z.number(),
    pageSize: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
    items: z.array(itemSchema),
  });
}
