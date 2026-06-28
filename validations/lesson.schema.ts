import { z } from "zod";

// Schema for creating a lesson
export const CreateLessonSchema = z.object({
  section_id: z.number(),
  title: z.string(),
  description: z.string(),
  video_url: z.string(),
  duration: z.number(),
  is_preview: z.boolean(),
});

export type CreateLessonFormValues = z.infer<typeof CreateLessonSchema>;

// Schema for editing a lesson
export const EditLessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  video_url: z.string(),
  duration: z.number(),
  is_preview: z.boolean(),
});

export type EditLessonFormValues = z.infer<typeof EditLessonSchema>;
