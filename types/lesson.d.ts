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
