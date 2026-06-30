import axiosInstance from "@/api/axios-instance";
import { BaseResponse, PaginationReponse } from "@/types/response-model";
import {
  ReorderSectionType,
  SectionQueryType,
  SectionType,
} from "@/types/section";
import {
  CreateSectionFormValues,
  EditSectionFormValues,
} from "@/validations/section.schema";

export const fetchSections = async (
  query?: SectionQueryType,
): Promise<PaginationReponse<SectionType[]>> => {
  const response = await axiosInstance.get("/admin/sections", {
    params: { paginate: false, ...query },
  });
  return response.data;
};

export const reorderSection = async (
  id: number,
  reorderSectionList: ReorderSectionType,
): Promise<BaseResponse<SectionType[]>> => {
  const response = await axiosInstance.patch(
    `/admin/sections/${id}/reorder`,
    reorderSectionList,
  );
  return response.data;
};

export const fetchSectionById = async (
  id: number,
): Promise<BaseResponse<SectionType>> => {
  const response = await axiosInstance.get(`/admin/sections/${id}`);
  return response.data;
};

export const createSection = async (data: CreateSectionFormValues) => {
  const response = await axiosInstance.post("/admin/sections", data);
  return response.data;
};

export const updateSection = async (
  id: number,
  data: EditSectionFormValues,
) => {
  const response = await axiosInstance.patch(`/admin/sections/${id}`, data);
  return response.data;
};
