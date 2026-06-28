"use client";

import {
  createLesson,
  fetchLessonById,
  fetchLessons,
  reorderLesson,
  updateLesson,
} from "@/api/lesson";
import { LessonQueryType, ReorderLessonType } from "@/types/lesson";
import {
  CreateLessonFormValues,
  EditLessonFormValues,
} from "@/validations/lesson.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const lessonKeys = {
  all: ["lessons"] as const,
  list: (query?: LessonQueryType) => ["lessons", query] as const,
  detail: (id: number) => ["lesson", id] as const,
};

export const useLessons = (query?: LessonQueryType) => {
  return useQuery({
    queryKey: lessonKeys.list(query),
    queryFn: () => fetchLessons(query),
  });
};

export const useLesson = (id: number) => {
  return useQuery({
    queryKey: lessonKeys.detail(id),
    queryFn: () => fetchLessonById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLessonFormValues) => createLesson(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonKeys.all });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditLessonFormValues;
    }) => updateLesson(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: lessonKeys.all });
      queryClient.invalidateQueries({
        queryKey: lessonKeys.detail(variables.id),
      });
    },
  });
};

export const useReorderLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ReorderLessonType;
    }) => reorderLesson(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lessonKeys.all });
    },
  });
};
