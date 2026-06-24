import axiosInstance from "@/api/axiosInstance";
import { BaseResponse, PaginationReponse } from "@/types/responseModel";
import { OrderQueryType, OrderType } from "@/types/order";
import { EditOrderFormValues } from "@/validations/order.schema";

export const fetchOrders = async (
  query?: OrderQueryType,
): Promise<PaginationReponse<OrderType[]>> => {
  const response = await axiosInstance.get("/admin/orders", {
    params: { ...query },
  });
  return response.data;
};

export const fetchOrderById = async (
  id: number,
): Promise<BaseResponse<OrderType>> => {
  const response = await axiosInstance.get(`/admin/orders/${id}`);
  return response.data;
};

export const updateOrder = async (id: number, data: EditOrderFormValues) => {
  const response = await axiosInstance.patch(
    `/admin/orders/${id}/status`,
    data,
  );
  return response.data;
};
