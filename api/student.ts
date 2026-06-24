import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { StudentQueryType, StudentType } from "@/types/student";
import {
  CreateStudentFormValues,
  EditStudentFormValues,
} from "@/validations/student.schema";

export const fetchStudents = async (
  query?: StudentQueryType,
): Promise<PaginationReponse<StudentType[]>> => {
  const response = await axiosInstance.get("/admin/students", {
    params: { ...query },
  });
  return response.data;
};

export const fetchStudentById = async (
  id: number,
): Promise<BaseResponse<StudentType>> => {
  const response = await axiosInstance.get(`/admin/students/${id}`);
  return response.data;
};

export const createStudent = async (
  data: Omit<CreateStudentFormValues, "password_confirmation">,
) => {
  const response = await axiosInstance.post("/admin/students", data);
  return response.data;
};

export const updateStudent = async (
  id: number,
  data: Omit<EditStudentFormValues, "password_confirmation">,
) => {
  const response = await axiosInstance.patch(`/admin/students/${id}`, data);
  return response.data;
};
