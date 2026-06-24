"use client";

import {
  createCoupon,
  fetchCouponById,
  fetchCoupons,
  generateRandom,
  updateCoupon,
} from "@/api/coupon";
import { CouponQueryType } from "@/types/coupon";
import {
  CreateCouponFormValues,
  EditCouponFormValues,
} from "@/validations/coupon.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const couponKeys = {
  all: ["coupons"] as const,
  list: (query?: CouponQueryType) => ["coupons", query] as const,
  detail: (id: number) => ["coupon", id] as const,
};

export const useCoupons = (query?: CouponQueryType) => {
  return useQuery({
    queryKey: couponKeys.list(query),
    queryFn: () => fetchCoupons(query),
  });
};

export const useCoupon = (id: number) => {
  return useQuery({
    queryKey: couponKeys.detail(id),
    queryFn: () => fetchCouponById(id),
    enabled: !!id && !Number.isNaN(id),
  });
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCouponFormValues) => createCoupon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: EditCouponFormValues;
    }) => updateCoupon(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.all });
      queryClient.invalidateQueries({
        queryKey: couponKeys.detail(variables.id),
      });
    },
  });
};

export const useGenerateCouponCode = () => {
  return useMutation({
    mutationFn: generateRandom,
  });
};
