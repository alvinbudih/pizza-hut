import { z } from "zod";
import { ingredientSchema } from "./ingredient-schema";

export const itemSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: z.coerce.number({
    invalid_type_error: "Price must be a number",
    required_error: "Price is required",
  }),
  image: z.string({ required_error: "Image is required" }),
  AuthorId: z.string({ required_error: "Author is required" }).uuid(),
  CategoryId: z.string({ required_error: "Category is required" }).uuid(),
  Ingredients: z
    .array(ingredientSchema, { required_error: "Ingredient is required" })
    .nonempty("Item must have at least 1 ingredient"),
});

export const updateItemSchema = itemSchema.partial({ image: true });

export type ItemPayload = z.infer<typeof itemSchema>;

export type UpdateItemPayload = z.infer<typeof updateItemSchema>;
