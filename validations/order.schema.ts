import { z } from "zod";

export const EditOrderSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  note: z.string().trim().optional(),
});

export type EditOrderFormValues = z.infer<typeof EditOrderSchema>;
