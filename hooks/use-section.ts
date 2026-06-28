"use client";

import {
  createSection,
  fetchSectionById,
  fetchSections,
  reorderSection,
  updateSection,
} from "@/api/section";
import { ReorderSectionType, SectionQueryType } from "@/types/section";
import {
  CreateSectionFormValues,
  EditSectionFormValues,
} from "@/validations/section.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const sectionKeys = {
  all: ["sections"] as const,
  list: (query?: SectionQueryType) => ["sections", query] as const,
  detail: (id: number) => ["section", id] as const,
};

export const useSections = (query?: SectionQueryType) => {
  return useQuery({
    queryKey: sectionKeys.list(query),
    queryFn: () => fetchSections(query),
  });
};

export const useSection = (id: number) => {
  return useQuery({
    queryKey: sectionKeys.detail(id),
    queryFn: () => fetchSectionById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSectionFormValues) => createSection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sectionKeys.all });
    },
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditSectionFormValues;
    }) => updateSection(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: sectionKeys.all });
      queryClient.invalidateQueries({
        queryKey: sectionKeys.detail(variables.id),
      });
    },
  });
};

export const useReorderSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: ReorderSectionType;
    }) => reorderSection(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sectionKeys.all });
    },
  });
};
