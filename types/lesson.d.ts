export interface LessonType {
  id: number;
  section_id: number;
  title: string;
  description: string;
  video_url: string;
  duration: number;
  sort_order: number;
  is_preview: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReorderLessonType {
  previous_lesson_id?: number;
  next_lesson_id?: number;
}

export const lessonSortableFields = [
  "id",
  "title",
  "duration",
  "sort_order",
  "created_at",
  "updated_at",
] as const;

export type LessonSortableField = (typeof lessonSortableFields)[number];

export interface LessonQueryType extends QueryType<LessonSortableField> {
  paginate?: boolean;
  section_id?: number;
}
