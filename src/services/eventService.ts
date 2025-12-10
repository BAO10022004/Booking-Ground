import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface Event {
  id: string;
  name: string;
  price: number;
  ticket_number: number;
  level?: string;
}

export interface EventsResponse {
  data: Event[];
}

export const eventService = {
  async getAllEvents(): Promise<Event[]> {
    const response = await apiClient.get<EventsResponse>(
      API_ENDPOINTS.EVENTS.LIST
    );

    return (response.data as EventsResponse)?.data || [];
  },
};
