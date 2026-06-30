import { AdminUserType } from "./admin";
import { QueryType } from "./query-type";

export interface PaymentType {
  id: number;
  admin_id: number;
  name: string;
  slug: string;
  logo_url: string;
  logo_public_id: string;
  account_no: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  admin: AdminUserType;
}

export const paymentSortableFields = [
  "id",
  "name",
  "slug",
  "is_active",
  "created_at",
  "updated_at",
] as const;

export type PaymentSortableField = (typeof paymentSortableFields)[number];

export interface PaymentQueryType extends QueryType<PaymentSortableField> {
  is_active?: boolean;
}
