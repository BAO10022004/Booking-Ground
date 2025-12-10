import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface GroundFilters {
  venue_id?: string;
}

export interface Ground {
  id: string;
  name: string;
  venue_id: string;
  category_id: string;
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

    const response = await apiClient.get<GroundsResponse>(
      API_ENDPOINTS.GROUNDS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    return (response.data as GroundsResponse)?.data || [];
  },
};
