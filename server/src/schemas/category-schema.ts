import { z } from "zod";

export const categorySchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1).max(255),
});

export type CategoryPayload = z.infer<typeof categorySchema>;
