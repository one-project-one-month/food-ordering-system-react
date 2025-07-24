import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Category Name is required"),
});