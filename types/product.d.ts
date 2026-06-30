import { CourseType } from "./course";
import { QueryType } from "./query-type";

export interface ProductType {
  id: number;
  admin_id: number;
  name: string;
  description: string;
  price: number;
  currency: CurrencyEnum;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  courses: CourseType[];
}

export const productSortableFields = [
  "id",
  "name",
  "price",
  "currency",
  "is_active",
  "created_at",
  "updated_at",
] as const;

export type ProductSortableField = (typeof productSortableFields)[number];

export type CurrencyEnum = "MMK" | "USD";

export interface ProductQueryType extends QueryType<ProductSortableField> {
  is_active: boolean;
  currency: CurrencyEnum;
}
