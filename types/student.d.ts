import { QueryType } from "./queryType";

export interface StudentType {
  id: number;
  student_uid: string;
  admin_id: number;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
  email_verified_at?: any;
  created_at: string;
  updated_at: string;
}

export const studentSortableFields = [
  "id",
  "student_uid",
  "name",
  "email",
  "phone",
  "is_active",
  "email_verified_at",
  "created_at",
  "updated_at",
] as const;

export type StudentSortableField = (typeof studentSortableFields)[number];

export type StudentQueryType = QueryType<StudentSortableField>;
