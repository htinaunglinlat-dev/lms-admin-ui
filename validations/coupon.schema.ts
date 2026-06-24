import { z } from "zod";

export const CouponBaseSchema = z.object({
  code: z.string().trim().min(2, "Code must be at least 2 characters long"),
  discount_type: z.enum(["PERCENTAGE", "FIXED"]),
  discount_value: z.number().min(1, "Discount value must be at least 1"),
  max_uses: z.number().min(1, "Max uses must be at least 1").optional(),
  expires_at: z.date().optional(),
  is_active: z.boolean().optional(),
});

// For creation, use the base schema fields directly
export const CreateCouponSchema = CouponBaseSchema;
export type CreateCouponFormValues = z.infer<typeof CreateCouponSchema>;

// For editing, you can reuse the base schema directly or make all fields optional if partial updates are allowed
export const EditCouponSchema = CouponBaseSchema;
export type EditCouponFormValues = z.infer<typeof EditCouponSchema>;
