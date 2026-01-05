import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface GroundFilters {
  venue_id?: string;
  category_id?: string;
}

export interface Ground {
  id: string;
  name: string;
  venue_id: string;
  category_id: string;
  created_at?: string;
  updated_at?: string;
  venue?: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface GroundsResponse {
  data: Ground[];
}

export const groundService = {
  async getAllGrounds(filters?: GroundFilters): Promise<Ground[]> {
    const params: Record<string, string> = {};

    if (filters?.venue_id) params.venue_id = filters.venue_id;
    if (filters?.category_id) params.category_id = filters.category_id;

    const response = await apiClient.get<GroundsResponse>(
      API_ENDPOINTS.GROUNDS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as GroundsResponse)?.data || (response as any)?.data || [];
    return Array.isArray(data) ? data : [];
  },

  async getGroundById(id: string): Promise<Ground> {
    const response = await apiClient.get<Ground>(
      API_ENDPOINTS.GROUNDS.DETAIL(id)
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Ground;
  },
};
