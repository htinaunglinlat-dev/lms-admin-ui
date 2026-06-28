import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { TagQueryType, TagType } from "@/types/tag";
import { TagFormValues } from "@/validations/tag.schema";

export const fetchTags = async (
  query?: TagQueryType,
): Promise<PaginationReponse<TagType[]>> => {
  const response = await axiosInstance.get("/admin/tags", {
    params: { ...query },
  });
  return response.data;
};

export const fetchTagById = async (
  id: number,
): Promise<BaseResponse<TagType>> => {
  const response = await axiosInstance.get(`/admin/tags/${id}`);
  return response.data;
};

export const createTag = async (data: TagFormValues) => {
  const response = await axiosInstance.post("/admin/tags", data);
  return response.data;
};

export const updateTag = async (id: number, data: TagFormValues) => {
  const response = await axiosInstance.patch(`/admin/tags/${id}`, data);
  return response.data;
};
