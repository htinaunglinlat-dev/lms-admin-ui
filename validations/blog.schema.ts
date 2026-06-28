import { z } from "zod";

export const BlogSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters long"),
  excerpt: z.string().trim().min(5, "Excerpt must be at least 5 characters long"),
  content: z.string().trim().min(10, "Content must be at least 10 characters long"),
  cover_image_url: z.string().url().or(z.literal("")).optional(),
  cover_image_public_id: z.string().optional(),
  og_image_url: z.string().url().or(z.literal("")).optional(),
  og_image_public_id: z.string().optional(),
  is_published: z.boolean(),
  tag_ids: z.array(z.number()).optional(),
  course_ids: z.array(z.number()).optional(),
});

export type BlogFormValues = z.infer<typeof BlogSchema>;