"use client";

import {
  createPayment,
  fetchPaymentById,
  fetchPayments,
  updatePayment,
} from "@/api/payment";
import { PaymentQueryType } from "@/types/payment";
import {
  CreatePaymentFormValues,
  EditPaymentFormValues,
} from "@/validations/payment.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const paymentKeys = {
  all: ["payments"] as const,
  list: (query?: PaymentQueryType) => ["payments", query] as const,
  detail: (id: number) => ["payment", id] as const,
};

export const usePayments = (query?: PaymentQueryType) => {
  return useQuery({
    queryKey: paymentKeys.list(query),
    queryFn: () => fetchPayments(query),
  });
};

export const usePayment = (id: number) => {
  return useQuery({
    queryKey: paymentKeys.detail(id),
    queryFn: () => fetchPaymentById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentFormValues) => createPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditPaymentFormValues;
    }) => updatePayment(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      queryClient.invalidateQueries({
        queryKey: paymentKeys.detail(variables.id),
      });
    },
  });
};
