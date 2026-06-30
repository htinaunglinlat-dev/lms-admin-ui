import { QueryType } from "./query-type";

export interface CouponType {
  id: number;
  admin_id: number;
  code: string;
  discount_type: DiscountTypeEnum;
  discount_value: number;
  max_uses: number;
  used_count: number;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export const couponSortableFields = [
  "id",
  "code",
  "discount_type",
  "discount_value",
  "max_uses",
  "used_count",
  "expires_at",
  "is_active",
  "created_at",
] as const;

export type DiscountTypeEnum = "PERCENTAGE" | "FIXED";

export type CouponSortableField = (typeof couponSortableFields)[number];

export interface CouponQueryType extends QueryType<CouponSortableField> {
  discount_type?: DiscountTypeEnum;
  is_active?: boolean;
}
