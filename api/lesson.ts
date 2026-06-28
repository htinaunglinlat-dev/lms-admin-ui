import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { LessonQueryType, LessonType, ReorderLessonType } from "@/types/lesson";
import {
  CreateLessonFormValues,
  EditLessonFormValues,
} from "@/validations/lesson.schema";

export const fetchLessons = async (
  query?: LessonQueryType,
): Promise<PaginationReponse<LessonType[]>> => {
  const response = await axiosInstance.get("/admin/lessons", {
    params: { paginate: false, ...query },
  });
  return response.data;
};

export const reorderLesson = async (
  id: number,
  reorderSectionList: ReorderLessonType,
): Promise<BaseResponse<LessonType[]>> => {
  const response = await axiosInstance.patch(
    `/admin/lessons/${id}/reorder`,
    reorderSectionList,
  );
  return response.data;
};

export const fetchLessonById = async (
  id: number,
): Promise<BaseResponse<LessonType>> => {
  const response = await axiosInstance.get(`/admin/lessons/${id}`);
  return response.data;
};

export const createLesson = async (data: CreateLessonFormValues) => {
  const response = await axiosInstance.post("/admin/lessons", data);
  return response.data;
};

export const updateLesson = async (id: number, data: EditLessonFormValues) => {
  const response = await axiosInstance.patch(`/admin/lessons/${id}`, data);
  return response.data;
};
