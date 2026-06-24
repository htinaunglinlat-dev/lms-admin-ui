import { z } from "zod";

export const CreatePaymentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo_url: z.url("Invalid URL format").optional(),
  logo_public_id: z.string().min(1, "Public ID is required").optional(),
  account_no: z.string().min(1, "Account number is required"),
  is_active: z.boolean(),
});

export type CreatePaymentFormValues = z.infer<typeof CreatePaymentSchema>;

export const EditPaymentSchema = CreatePaymentSchema;

export type EditPaymentFormValues = z.infer<typeof EditPaymentSchema>;
