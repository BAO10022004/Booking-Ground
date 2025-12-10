import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface VenueFilters {
  category_id?: string;
  city?: string;
  search?: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  sub_address?: string;
  district?: string;
  city?: string;
  operating_time?: string;
  phone_number1?: string;
  phone_number2?: string;
  website?: string;
  deposit?: number;
  owner?: {
    id: string;
    name: string;
  };
  categories?: Array<{
    id: string;
    name: string;
  }>;
  images?: Array<{
    id: string;
    name: string;
    image_url: string;
  }>;
  grounds?: Array<{
    id: string;
    name: string;
    venue_id: string;
    category_id: string;
  }>;
}

export interface VenuesResponse {
  data: Venue[];
}

export const venueService = {
  async getAllVenues(filters?: VenueFilters): Promise<Venue[]> {
    const params: Record<string, string> = {};

    if (filters?.category_id) params.category_id = filters.category_id;
    if (filters?.city) params.city = filters.city;
    if (filters?.search) params.search = filters.search;

    const response = await apiClient.get<VenuesResponse>(
      API_ENDPOINTS.VENUES.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    return (response.data as VenuesResponse)?.data || [];
  },

  async getVenueById(id: string): Promise<Venue> {
    const response = await apiClient.get<Venue>(
      API_ENDPOINTS.VENUES.DETAIL(id)
    );

    return response.data as Venue;
  },
};
