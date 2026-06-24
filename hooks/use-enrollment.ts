"use client";

import {
  createEnrollment,
  fetchEnrollmentById,
  fetchEnrollments,
  updateEnrollment,
} from "@/api/enrollment";
import { EnrollmentQueryType } from "@/types/enrollment";
import {
  CreateEnrollmentFormValues,
  EditEnrollmentFormValues,
} from "@/validations/enrollment.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const enrollmentKeys = {
  all: ["enrollments"] as const,
  list: (query?: EnrollmentQueryType) => ["enrollments", query] as const,
  detail: (id: number) => ["enrollment", id] as const,
};

export const useEnrollments = (query?: EnrollmentQueryType) => {
  return useQuery({
    queryKey: enrollmentKeys.list(query),
    queryFn: () => fetchEnrollments(query),
  });
};

export const useEnrollment = (id: number) => {
  return useQuery({
    queryKey: enrollmentKeys.detail(id),
    queryFn: () => fetchEnrollmentById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEnrollmentFormValues) =>
      createEnrollment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.all });
    },
  });
};

export const useUpdateEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditEnrollmentFormValues;
    }) => updateEnrollment(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.all });
      queryClient.invalidateQueries({
        queryKey: enrollmentKeys.detail(variables.id),
      });
    },
  });
};
