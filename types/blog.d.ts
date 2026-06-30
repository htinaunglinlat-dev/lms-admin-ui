import { AdminUserType } from "./admin";
import { CourseType } from "./course";
import { QueryType } from "./query-type";
import { TagType } from "./tag";

export interface BlogType {
  id: number;
  admin_id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_public_id: string;
  og_image_url: string;
  og_image_public_id: string;
  is_published: boolean;
  published_at: string;
  view: number;
  created_at: string;
  updated_at: string;
  admin: AdminUserType;
  tags: TagType[];
  courses: CourseType[];
}

export const blogSortableFields = ["id", "title", "excerpt", "view"] as const;

export type BlogSortableField = (typeof blogSortableFields)[number];

export interface BlogQueryType extends QueryType<BlogSortableField> {
  is_published?: boolean;
}
