import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface Image {
  id: string;
  name: string;
  image_url: string;
  url?: string;
  full_url?: string;
}

export interface UploadImageResponse {
  message: string;
  image: Image;
}

export const imageService = {
  async uploadImage(file: File, name?: string): Promise<Image> {
    const additionalData = name ? { name } : undefined;
    const response = await apiClient.uploadFile<UploadImageResponse>(
      API_ENDPOINTS.IMAGES.UPLOAD,
      file,
      additionalData
    );

    return (response.data as UploadImageResponse)?.image as Image;
  },

  async getImage(id: string): Promise<Image> {
    const response = await apiClient.get<Image>(API_ENDPOINTS.IMAGES.GET(id));

    return response.data as Image;
  },

  async deleteImage(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.IMAGES.DELETE(id));
  },
};
