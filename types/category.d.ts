import { QueryType } from "./query-type";

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const categorySortableFields = [
  "id",
  "name",
  "slug",
  "created_at",
  "updated_at",
] as const;

export type CategorySortableField = (typeof categorySortableFields)[number];

export type CategoryQueryType = QueryType<CategorySortableField>;
