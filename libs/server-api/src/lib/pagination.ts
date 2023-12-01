import {z} from "zod";

export const PagedRequestSchema = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
})
export type PagedRequest = z.infer<typeof PagedRequestSchema>;


export interface PagedResults<DataType> {
  results: DataType[]
}
