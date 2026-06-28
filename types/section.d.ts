export interface SectionType {
  id: number;
  course_id: number;
  title: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ReorderSectionType {
  previous_section_id?: number;
  next_section_id?: number;
}

export const sectionSortableFields = [
  "id",
  "course_id",
  "title",
  "sort_order",
  "created_at",
  "updated_at",
] as const;

export type SectionSortableField = (typeof sectionSortableFields)[number];

export interface SectionQueryType extends QueryType<SectionSortableField> {
  paginate?: boolean;
  course_id?: number;
}
