import { z } from "zod/v4";

const categorySchema = z.object({
  name: z
    .string("Name must be a string")
    .min(1, "Name must be at least 1 character")
    .max(255, "Name must be at most 255 characters"),
});

export default categorySchema;
