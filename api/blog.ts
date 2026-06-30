import axiosInstance from "@/api/axios-instance";
import { BaseResponse, PaginationReponse } from "@/types/response-model";
import { BlogQueryType, BlogType } from "@/types/blog";
import { BlogFormValues } from "@/validations/blog.schema";

export const fetchBlogs = async (
  query?: BlogQueryType,
): Promise<PaginationReponse<BlogType[]>> => {
  const response = await axiosInstance.get("/admin/blogs", {
    params: { ...query },
  });
  return response.data;
};

export const fetchBlogById = async (
  id: number,
): Promise<BaseResponse<BlogType>> => {
  const response = await axiosInstance.get(`/admin/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data: BlogFormValues) => {
  const response = await axiosInstance.post("/admin/blogs", data);
  return response.data;
};

export const updateBlog = async (id: number, data: BlogFormValues) => {
  const response = await axiosInstance.patch(`/admin/blogs/${id}`, data);
  return response.data;
};
