import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  description: z.string().trim().optional(),
  price: z.number().nonnegative("Price cannot be negative"),
  currency: z.enum(["MMK", "USD"]),
  is_active: z.boolean().optional(),
  course_ids: z
    .array(z.number())
    .min(1, "At least one course must be included"),
});

export type CreateProductFormValues = z.infer<typeof CreateProductSchema>;

export const EditProductSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  description: z.string().trim().optional(),
  price: z.number().nonnegative("Price cannot be negative"),
  currency: z.enum(["MMK", "USD"]),
  is_active: z.boolean().optional(),
  course_ids: z
    .array(z.number())
    .min(1, "At least one course must be included"),
});

export type EditProductFormValues = z.infer<typeof EditProductSchema>;
