"use client";

import {
  createCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from "@/api/category";
import { CategoryQueryType } from "@/types/category";
import { CategoryFormValues } from "@/validations/category.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const categoryKeys = {
  all: ["categories"] as const,
  list: (query?: CategoryQueryType) => ["categories", query] as const,
  detail: (id: number) => ["category", id] as const,
};

export const useCategories = (query?: CategoryQueryType) => {
  return useQuery({
    queryKey: categoryKeys.list(query),
    queryFn: () => fetchCategories(query),
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => fetchCategoryById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CategoryFormValues) => createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: CategoryFormValues;
    }) => updateCategory(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) });
    },
  });
};
