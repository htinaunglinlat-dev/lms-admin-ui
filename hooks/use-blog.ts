"use client";

import {
  createBlog,
  fetchBlogById,
  fetchBlogs,
  updateBlog,
} from "@/api/blog";
import { BlogQueryType } from "@/types/blog";
import { BlogFormValues } from "@/validations/blog.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const blogKeys = {
  all: ["blogs"] as const,
  list: (query?: BlogQueryType) => ["blogs", query] as const,
  detail: (id: number) => ["blog", id] as const,
};

export const useBlogs = (query?: BlogQueryType) => {
  return useQuery({
    queryKey: blogKeys.list(query),
    queryFn: () => fetchBlogs(query),
  });
};

export const useBlog = (id: number) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => fetchBlogById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BlogFormValues) => createBlog(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: BlogFormValues;
    }) => updateBlog(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      queryClient.invalidateQueries({
        queryKey: blogKeys.detail(variables.id),
      });
    },
  });
};
