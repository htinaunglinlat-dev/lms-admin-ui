import { z } from "zod";

// Schema for creating an enrollment
export const CreateEnrollmentSchema = z.object({
  student_id: z.number().int(),
  course_id: z.number().int(),
  enrollment_type: z.enum(["FREE", "GIVEAWAY", "ORDER"]),
  expires_at: z.date().optional(),
  is_active: z.boolean().optional(),
});

export type CreateEnrollmentFormValues = z.infer<typeof CreateEnrollmentSchema>;

// Schema for editing an enrollment
export const EditEnrollmentSchema = z.object({
  is_active: z.boolean(),
  expires_at: z.date().optional(),
  completed_at: z.date().optional(),
});

export type EditEnrollmentFormValues = z.infer<typeof EditEnrollmentSchema>;
