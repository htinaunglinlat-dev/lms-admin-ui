import {
  CreateAdminFormValues,
  EditAdminFormValues,
} from "@/validations/admin.schema";
import axiosInstance from "@/api/axiosInstance";
import { AdminQueryType, AdminUserType } from "@/types/admin";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";

export const fetchAdmins = async (
  query?: AdminQueryType,
): Promise<PaginationReponse<AdminUserType[]>> => {
  const response = await axiosInstance.get("/admins", {
    params: { ...query },
  });
  return response.data;
};

export const fetchAdminById = async (
  id: number,
): Promise<BaseResponse<AdminUserType>> => {
  const response = await axiosInstance.get(`/admins/${id}`);
  return response.data;
};

export const createUser = async (
  data: Omit<CreateAdminFormValues, "password_confirmation">,
) => {
  const response = await axiosInstance.post("/admins", data);
  return response.data;
};

export const updateUser = async (
  id: number,
  data: Omit<EditAdminFormValues, "password_confirmation">,
) => {
  const response = await axiosInstance.patch(`/admins/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/admins/${id}`);
  return response.data;
};
