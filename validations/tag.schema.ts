import { z } from "zod";

export const TagSchema = z.object({
  name: z.string().trim().min(2, "Tag name must be at least 2 characters"),
});

export type TagFormValues = z.infer<typeof TagSchema>;
