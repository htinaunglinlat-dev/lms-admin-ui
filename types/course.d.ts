import { AdminUserType } from "./admin";
import { CategoryType } from "./category";
import { QueryType } from "./queryType";

export interface CourseType {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  thumbnail_url: string;
  thumbnail_public_id: string;
  level: CourseLevelEnum;
  language: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  admin: AdminUserType;
  categories: CategoryType[];
}

export const courseSortableFields = [
  "id",
  "title",
  "slug",
  "level",
  "language",
  "is_published",
  "sort_order",
  "created_at",
  "updated_at",
] as const;

export type CourseLevelEnum = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type CourseSortableField = (typeof courseSortableFields)[number];

export interface CourseQueryType extends QueryType<CourseSortableField> {
  level?: CourseLevelEnum;
  is_published?: boolean;
}
