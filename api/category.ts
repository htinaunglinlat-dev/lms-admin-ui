import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { CategoryQueryType, CategoryType } from "@/types/category";
import { CategoryFormValues } from "@/validations/category.schema";

export const fetchCategories = async (
  query?: CategoryQueryType,
): Promise<PaginationReponse<CategoryType[]>> => {
  const response = await axiosInstance.get("/admin/categories", {
    params: { ...query },
  });
  return response.data;
};

export const fetchCategoryById = async (
  id: number,
): Promise<BaseResponse<CategoryType>> => {
  const response = await axiosInstance.get(`/admin/categories/${id}`);
  return response.data;
};

export const createCategory = async (data: CategoryFormValues) => {
  const response = await axiosInstance.post("/admin/categories", data);
  return response.data;
};

export const updateCategory = async (id: number, data: CategoryFormValues) => {
  const response = await axiosInstance.patch(`/admin/categories/${id}`, data);
  return response.data;
};
