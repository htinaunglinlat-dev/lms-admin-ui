import axiosInstance from "@/api/axios-instance";
import { BaseResponse, PaginationReponse } from "@/types/response-model";
import { ProductQueryType, ProductType } from "@/types/product";
import {
  CreateProductFormValues,
  EditProductFormValues,
} from "@/validations/product.schema";

export const fetchProducts = async (
  query?: ProductQueryType,
): Promise<PaginationReponse<ProductType[]>> => {
  const response = await axiosInstance.get("/admin/products", {
    params: { ...query },
  });
  return response.data;
};

export const fetchProductById = async (
  id: number,
): Promise<BaseResponse<ProductType>> => {
  const response = await axiosInstance.get(`/admin/products/${id}`);
  return response.data;
};

export const createProduct = async (data: CreateProductFormValues) => {
  const response = await axiosInstance.post("/admin/products", data);
  return response.data;
};

export const updateProduct = async (id: number, data: EditProductFormValues) => {
  const response = await axiosInstance.patch(`/admin/products/${id}`, data);
  return response.data;
};
