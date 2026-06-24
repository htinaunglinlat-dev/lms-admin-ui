"use client";

import {
  createCourse,
  fetchCourseById,
  fetchCourses,
  updateCourse,
} from "@/api/course";
import { CourseQueryType } from "@/types/course";
import {
  CreateCourseFormValues,
  EditCourseFormValues,
} from "@/validations/course.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const courseKeys = {
  all: ["courses"] as const,
  list: (query?: CourseQueryType) => ["courses", query] as const,
  detail: (id: number) => ["course", id] as const,
};

export const useCourses = (query?: CourseQueryType) => {
  return useQuery({
    queryKey: courseKeys.list(query),
    queryFn: () => fetchCourses(query),
  });
};

export const useCourse = (id: number) => {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => fetchCourseById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCourseFormValues) => createCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditCourseFormValues;
    }) => updateCourse(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
      queryClient.invalidateQueries({
        queryKey: courseKeys.detail(variables.id),
      });
    },
  });
};
