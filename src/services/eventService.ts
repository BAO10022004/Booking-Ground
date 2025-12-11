import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface Event {
  id: string;
  name: string;
  price: number;
  ticket_number: number;
  level?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  venue_id?: string;
  ground_id?: string;
  description?: string;
}

export interface EventFilters {
  search?: string;
}

export interface EventsResponse {
  data: Event[];
}

export const eventService = {
  async getAllEvents(filters?: EventFilters): Promise<Event[]> {
    const params: Record<string, string> = {};

    if (filters?.search) params.search = filters.search;

    const response = await apiClient.get<EventsResponse>(
      API_ENDPOINTS.EVENTS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as EventsResponse)?.data || (response as any)?.data || [];
    return Array.isArray(data) ? data : [];
  },

  async getEventById(id: string): Promise<Event> {
    const response = await apiClient.get<Event>(
      API_ENDPOINTS.EVENTS.DETAIL(id)
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Event;
  },
};
