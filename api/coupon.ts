import axiosInstance from "@/api/axios-instance";
import { BaseResponse, PaginationReponse } from "@/types/response-model";
import { CouponQueryType, CouponType } from "@/types/coupon";
import {
  CreateCouponFormValues,
  EditCouponFormValues,
} from "@/validations/coupon.schema";

export const fetchCoupons = async (
  query?: CouponQueryType,
): Promise<PaginationReponse<CouponType[]>> => {
  const response = await axiosInstance.get("/admin/coupons", {
    params: { ...query },
  });
  return response.data;
};

export const generateRandom = async (): Promise<
  BaseResponse<{ code: string }>
> => {
  const response = await axiosInstance.post("/admin/coupons/generate");
  return response.data;
};

export const fetchCouponById = async (
  id: number,
): Promise<BaseResponse<CouponType>> => {
  const response = await axiosInstance.get(`/admin/coupons/${id}`);
  return response.data;
};

export const createCoupon = async (data: CreateCouponFormValues) => {
  const response = await axiosInstance.post("/admin/coupons", data);
  return response.data;
};

export const updateCoupon = async (id: number, data: EditCouponFormValues) => {
  const response = await axiosInstance.patch(`/admin/coupons/${id}`, data);
  return response.data;
};
