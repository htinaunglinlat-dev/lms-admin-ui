import axiosInstance from "@/api/axios-instance";
import { BaseResponse, PaginationReponse } from "@/types/response-model";
import { EnrollmentQueryType, EnrollmentType } from "@/types/enrollment";
import {
  CreateEnrollmentFormValues,
  EditEnrollmentFormValues,
} from "@/validations/enrollment.schema";

export const fetchEnrollments = async (
  query?: EnrollmentQueryType,
): Promise<PaginationReponse<EnrollmentType[]>> => {
  const response = await axiosInstance.get("/admin/enrollments", {
    params: { ...query },
  });
  return response.data;
};

export const fetchEnrollmentById = async (
  id: number,
): Promise<BaseResponse<EnrollmentType>> => {
  const response = await axiosInstance.get(`/admin/enrollments/${id}`);
  return response.data;
};

export const createEnrollment = async (data: CreateEnrollmentFormValues) => {
  const response = await axiosInstance.post("/admin/enrollments", data);
  return response.data;
};

export const updateEnrollment = async (
  id: number,
  data: EditEnrollmentFormValues,
) => {
  const response = await axiosInstance.patch(
    `/admin/enrollments/${id}/status`,
    data,
  );
  return response.data;
};
