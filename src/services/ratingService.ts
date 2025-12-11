import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface RatingFilters {
  venue_id?: string;
  user_id?: string;
}

export interface CreateRatingData {
  venue_id: string;
  star_number: number;
  review?: string;
}

export interface Rating {
  id?: string;
  user_id: string;
  venue_id: string;
  star_number: number;
  review?: string;
  created_at?: string;
  user?: {
    id: string;
    name: string;
    email?: string;
    phone_number?: string;
    avatar?: {
      image_url?: string;
      full_url?: string;
    };
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
    if (filters?.user_id) params.user_id = filters.user_id;

    const response = await apiClient.get<RatingsResponse>(
      API_ENDPOINTS.RATINGS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as RatingsResponse)?.data || (response as any)?.data || [];
    return Array.isArray(data) ? data : [];
  },

  async getRatingById(id: string): Promise<Rating> {
    const response = await apiClient.get<Rating>(
      API_ENDPOINTS.RATINGS.DETAIL(id)
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Rating;
  },

  async createRating(data: CreateRatingData): Promise<Rating> {
    const response = await apiClient.post<Rating>(
      API_ENDPOINTS.RATINGS.CREATE,
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Rating;
  },

  async updateRating(
    id: string,
    data: Partial<CreateRatingData>
  ): Promise<Rating> {
    const response = await apiClient.put<Rating>(
      API_ENDPOINTS.RATINGS.UPDATE(id),
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Rating;
  },

  async deleteRating(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.RATINGS.DELETE(id));
  },
};
