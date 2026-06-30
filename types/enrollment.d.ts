import { AdminUserType } from "./admin";
import { CourseType } from "./course";
import { OrderType } from "./order";
import { QueryType } from "./query-type";
import { StudentType } from "./student";

export interface EnrollmentType {
  id: number;
  student_id: number;
  course_id: number;
  order_id?: number;
  admin_id: number;
  enrollment_type: EnrollmentTypeEnum;
  enrolled_at: string;
  expires_at?: any;
  is_active: boolean;
  completed_at?: any;
  updated_at: string;
  student: StudentType;
  course: CourseType;
  order?: OrderType;
  admin: AdminUserType;
}

export const enrollmentSortableFields = [
  "id",
  "student_id",
  "course_id",
  "order_id",
  "admin_id",
  "enrollment_type",
  "enrolled_at",
  "expires_at",
  "is_active",
  "completed_at",
  "updated_at",
] as const;

export type EnrollmentSortableField = (typeof enrollmentSortableFields)[number];

export type EnrollmentTypeEnum = "ORDER" | "FREE" | "GIVEAWAY";

export interface EnrollmentQueryType extends QueryType<EnrollmentSortableField> {
  enrollment_type?: EnrollmentTypeEnum;
  student_id?: number;
  course_id?: number;
  order_id?: number;
  admin_id?: number;
  is_active?: boolean;
}
