import { z } from "zod/v4";

const productSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(1, "Name must be at least 1 character")
    .max(255, "Name must be at most 255 characters"),
  description: z.string().min(1, "Content must not be empty"),
  price: z.float32().positive(),
  categoryId: z.int().positive(),
});

export default productSchema;
