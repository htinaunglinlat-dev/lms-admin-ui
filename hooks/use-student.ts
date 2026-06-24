"use client";

import {
  createStudent,
  fetchStudentById,
  fetchStudents,
  updateStudent,
} from "@/api/student";
import { StudentQueryType } from "@/types/student";
import {
  CreateStudentFormValues,
  EditStudentFormValues,
} from "@/validations/student.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const studentKeys = {
  all: ["students"] as const,
  list: (query?: StudentQueryType) => ["students", query] as const,
  detail: (id: number) => ["student", id] as const,
};

export const useStudents = (query?: StudentQueryType) => {
  return useQuery({
    queryKey: studentKeys.list(query),
    queryFn: () => fetchStudents(query),
  });
};

export const useStudent = (id: number) => {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => fetchStudentById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: Omit<CreateStudentFormValues, "password_confirmation">,
    ) => createStudent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Omit<EditStudentFormValues, "password_confirmation">;
    }) => updateStudent(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.all });
      queryClient.invalidateQueries({
        queryKey: studentKeys.detail(variables.id),
      });
    },
  });
};
