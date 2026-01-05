import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";
import type { Venue } from "../types/venue";

export interface Favorite {
  id: string;
  user_id: string;
  venue_id: string;
  created_at?: string;
  venue?: Venue;
}

export interface FavoritesResponse {
  data: Venue[];
}

export const favoriteService = {
  async getMyFavorites(): Promise<Venue[]> {
    const response = await apiClient.get<FavoritesResponse>(
      API_ENDPOINTS.FAVORITES.LIST
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as FavoritesResponse)?.data ||
      (response as any)?.data ||
      [];
    return Array.isArray(data) ? data : [];
  },

  async addFavorite(
    venueId: string
  ): Promise<{ message: string; favorite?: Favorite }> {
    const response = await apiClient.post<{
      message: string;
      favorite?: Favorite;
    }>(API_ENDPOINTS.FAVORITES.CREATE, { venue_id: venueId });

    return (response.data || response) as {
      message: string;
      favorite?: Favorite;
    };
  },

  async removeFavorite(venueId: string): Promise<{ message: string }> {
    const response = await apiClient.delete<{ message: string }>(
      API_ENDPOINTS.FAVORITES.DELETE(venueId)
    );

    return (response.data || response) as { message: string };
  },
};
