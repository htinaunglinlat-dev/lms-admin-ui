"use client";

import {
  createTag,
  fetchTags,
  fetchTagById,
  updateTag,
} from "@/api/tag";
import { TagQueryType } from "@/types/tag";
import { TagFormValues } from "@/validations/tag.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const tagKeys = {
  all: ["tags"] as const,
  list: (query?: TagQueryType) => ["tags", query] as const,
  detail: (id: number) => ["tag", id] as const,
};

export const useTags = (query?: TagQueryType) => {
  return useQuery({
    queryKey: tagKeys.list(query),
    queryFn: () => fetchTags(query),
  });
};

export const useTag = (id: number) => {
  return useQuery({
    queryKey: tagKeys.detail(id),
    queryFn: () => fetchTagById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TagFormValues) => createTag(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: TagFormValues;
    }) => updateTag(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.all });
      queryClient.invalidateQueries({ queryKey: tagKeys.detail(variables.id) });
    },
  });
};
