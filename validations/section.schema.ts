import { z } from "zod";

// Schema for creating a section
export const CreateSectionSchema = z.object({
  course_id: z.number(),
  title: z.string(),
});

export type CreateSectionFormValues = z.infer<typeof CreateSectionSchema>;

// Schema for editing a section
export const EditSectionSchema = z.object({
  title: z.string(),
});

export type EditSectionFormValues = z.infer<typeof EditSectionSchema>;
