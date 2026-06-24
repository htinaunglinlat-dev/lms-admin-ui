import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters long"),
  short_description: z.string().trim().optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  thumbnail_url: z.url().optional(),
  thumbnail_public_id: z.string().optional(),
  language: z.string().trim().min(1, "Language is required"),
  is_published: z.boolean().optional(),
  category_ids: z.array(z.number()).optional(),
});

export type CreateCourseFormValues = z.infer<typeof CreateCourseSchema>;

export const EditCourseSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters long"),
  short_description: z.string().trim().optional(),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  thumbnail_url: z.url().optional(),
  thumbnail_public_id: z.string().optional(),
  language: z.string().trim().min(1, "Language is required"),
  is_published: z.boolean().optional(),
  category_ids: z.array(z.number()).optional(),
});

export type EditCourseFormValues = z.infer<typeof EditCourseSchema>;
