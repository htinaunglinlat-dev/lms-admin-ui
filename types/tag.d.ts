import { AdminUserType } from "./admin";
import { QueryType } from "./query-type";

export interface TagType {
  id: number;
  admin_id: number;
  name: string;
  slug: string;
  normalized_key: string;
  created_at: string;
  updated_at: string;
  admin: AdminUserType;
}

export const tagSortableFields = ["id", "name"] as const;

export type TagSortableField = (typeof tagSortableFields)[number];

export type TagQueryType = QueryType<TagSortableField>;
