import { QueryType } from "./queryType";

export interface AdminUserType {
  id: number;
  name: string;
  email: string;
  role: AdminRoleEnum;
  is_active: boolean;
  created_at: string;
}

export type AdminRoleEnum = "SUPER_ADMIN" | "ADMIN";

// Admin Query Type
declare interface AdminQueryType extends QueryType<AdminSortableField> {}

export const adminSortableFields = [
  "id",
  "name",
  "email",
  "role",
  "created_at",
] as const;

type AdminSortableField = (typeof adminSortableFields)[number];
