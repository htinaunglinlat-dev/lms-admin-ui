"use client";

import {
  createProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "@/api/product";
import { ProductQueryType } from "@/types/product";
import {
  CreateProductFormValues,
  EditProductFormValues,
} from "@/validations/product.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const productKeys = {
  all: ["products"] as const,
  list: (query?: ProductQueryType) => ["products", query] as const,
  detail: (id: number) => ["product", id] as const,
};

export const useProducts = (query?: ProductQueryType) => {
  return useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => fetchProducts(query),
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductFormValues) => createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditProductFormValues;
    }) => updateProduct(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      });
    },
  });
};
