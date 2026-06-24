import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { CourseQueryType, CourseType } from "@/types/course";
import {
  CreateCourseFormValues,
  EditCourseFormValues,
} from "@/validations/course.schema";

export const fetchCourses = async (
  query?: CourseQueryType,
): Promise<PaginationReponse<CourseType[]>> => {
  const response = await axiosInstance.get("/admin/courses", {
    params: { ...query },
  });
  return response.data;
};

export const fetchCourseById = async (
  id: number,
): Promise<BaseResponse<CourseType>> => {
  const response = await axiosInstance.get(`/admin/courses/${id}`);
  return response.data;
};

export const createCourse = async (data: CreateCourseFormValues) => {
  const response = await axiosInstance.post("/admin/courses", data);
  return response.data;
};

export const updateCourse = async (id: number, data: EditCourseFormValues) => {
  const response = await axiosInstance.patch(`/admin/courses/${id}`, data);
  return response.data;
};
