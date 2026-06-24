export interface QueryType<T> {
  page?: number;
  limit?: number;
  search?: string;
  sort_direction?: SortDirectionEnum;
  sort_by?: T;
  start_date?: string;
  end_date?: string;
}

export type SortDirectionEnum = 'asc' | 'desc';
  
// Course Query Type

export interface CourseQueryType extends QueryType<> {
  level?: LevelEum;
  is_published?: boolean;
}

export type LevelEnum = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
