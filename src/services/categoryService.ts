import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface Category {
  id: string;
  name: string;
}

export interface CategoriesResponse {
  data: Category[];
}

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    const response = await apiClient.get<CategoriesResponse>(
      API_ENDPOINTS.CATEGORIES.LIST
    );

    return (response.data as CategoriesResponse)?.data || [];
  },
};
