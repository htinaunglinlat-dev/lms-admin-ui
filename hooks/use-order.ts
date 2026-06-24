"use client";

import { fetchOrderById, fetchOrders, updateOrder } from "@/api/order";
import { OrderQueryType } from "@/types/order";
import { EditOrderFormValues } from "@/validations/order.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const orderKeys = {
  all: ["orders"] as const,
  list: (query?: OrderQueryType) => ["orders", query] as const,
  detail: (id: number) => ["order", id] as const,
};

export const useOrders = (query?: OrderQueryType) => {
  return useQuery({
    queryKey: orderKeys.list(query),
    queryFn: () => fetchOrders(query),
  });
};

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => fetchOrderById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditOrderFormValues;
    }) => updateOrder(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      });
    },
  });
};
