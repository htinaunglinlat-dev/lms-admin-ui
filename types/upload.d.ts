export interface ImageUploadResponse {
  field: string;
  url: string;
  public_id: string;
}

export type UploadEndpointEnum =
  | "blog-images"
  | "course-images"
  | "payment-images";

export type ImageFieldNameEnum =
  | "cover_image"
  | "og_image"
  | "thumbnail"
  | "logo";

export interface BlogImageUploadPayload {
  cover_image: File;
  og_image: File;
}

export interface CourseImageUploadPayload {
  thumbnail: File;
}

export interface PaymentImageUploadPayload {
  logo: File;
}
