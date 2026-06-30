import axiosInstance from "@/api/axios-instance";
import { BaseResponse } from "@/types/response-model";
import {
  ImageFieldNameEnum,
  ImageUploadResponse,
  UploadEndpointEnum,
} from "@/types/upload";

export const uploadImage = async (
  file: File,
  endpoint: UploadEndpointEnum,
  fieldName: ImageFieldNameEnum,
): Promise<BaseResponse<ImageUploadResponse[]>> => {
  const formData = new FormData();
  formData.append(fieldName, file);

  const response = await axiosInstance.post(
    `/admin/upload/${endpoint}`,
    formData,
  );
  return response.data;
};
