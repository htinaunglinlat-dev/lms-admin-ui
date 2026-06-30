import axiosInstance from "@/api/axios-instance";
import { AdminUserType } from "@/types/admin";
import { BaseResponse } from "@/types/response-model";
import { LoginFormValues } from "@/validations/auth.schema";

export const login = async (
  payload: LoginFormValues,
): Promise<
  BaseResponse<{
    access_token: string;
    user: AdminUserType;
  }>
> => {
  const response = await axiosInstance.post("/auth/admin/login", payload);
  return response.data;
};

export const getMe = async (): Promise<BaseResponse<AdminUserType>> => {
  const response = await axiosInstance.get("/auth/admin/me");
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/admin/logout");
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await axiosInstance.post("/auth/admin/refresh");
  return response.data as BaseResponse<{
    access_token: string;
  }>;
};
