import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({ required_error: "Name is required" }),
});

export type IngredientPayload = z.infer<typeof ingredientSchema>;
