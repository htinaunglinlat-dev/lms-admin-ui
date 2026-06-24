import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { PaymentQueryType, PaymentType } from "@/types/payment";
import {
  CreatePaymentFormValues,
  EditPaymentFormValues,
} from "@/validations/payment.schema";

export const fetchPayments = async (
  query?: PaymentQueryType,
): Promise<PaginationReponse<PaymentType[]>> => {
  const response = await axiosInstance.get("/admin/payments", {
    params: { ...query },
  });
  return response.data;
};

export const fetchPaymentById = async (
  id: number,
): Promise<BaseResponse<PaymentType>> => {
  const response = await axiosInstance.get(`/admin/payments/${id}`);
  return response.data;
};

export const createPayment = async (data: CreatePaymentFormValues) => {
  const response = await axiosInstance.post("/admin/payments", data);
  return response.data;
};

export const updatePayment = async (
  id: number,
  data: EditPaymentFormValues,
) => {
  const response = await axiosInstance.patch(`/admin/payments/${id}`, data);
  return response.data;
};
