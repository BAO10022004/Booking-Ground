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

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data = (response.data as CategoriesResponse)?.data || (response as any)?.data || [];
    return Array.isArray(data) ? data : [];
  },

  async getCategoryById(id: string): Promise<Category> {
    const response = await apiClient.get<Category>(
      API_ENDPOINTS.CATEGORIES.DETAIL(id)
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Category;
  },
};
