import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface RatingFilters {
  venue_id?: string;
}

export interface CreateRatingData {
  venue_id: string;
  star_number: number;
  review?: string;
}

export interface Rating {
  user_id: string;
  venue_id: string;
  star_number: number;
  review?: string;
  user?: {
    id: string;
    name: string;
  };
  venue?: {
    id: string;
    name: string;
  };
}

export interface RatingsResponse {
  data: Rating[];
}

export const ratingService = {
  async getAllRatings(filters?: RatingFilters): Promise<Rating[]> {
    const params: Record<string, string> = {};

    if (filters?.venue_id) params.venue_id = filters.venue_id;

    const response = await apiClient.get<RatingsResponse>(
      API_ENDPOINTS.RATINGS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    return (response.data as RatingsResponse)?.data || [];
  },

  async getRatingById(id: string): Promise<Rating> {
    const response = await apiClient.get<Rating>(
      API_ENDPOINTS.RATINGS.DETAIL(id)
    );

    return response.data as Rating;
  },

  async createRating(data: CreateRatingData): Promise<Rating> {
    const response = await apiClient.post<Rating>(
      API_ENDPOINTS.RATINGS.CREATE,
      data
    );

    return response.data as Rating;
  },

  async updateRating(
    id: string,
    data: Partial<CreateRatingData>
  ): Promise<Rating> {
    const response = await apiClient.put<Rating>(
      API_ENDPOINTS.RATINGS.UPDATE(id),
      data
    );

    return response.data as Rating;
  },

  async deleteRating(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.RATINGS.DELETE(id));
  },
};
