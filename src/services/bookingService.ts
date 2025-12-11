import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface CreateBookingData {
  date: string;
  start_time: string;
  end_time: string;
  ground_id: string;
  is_event?: boolean;
  event_id?: string | null;
  target?: string;
  customer_note?: string;
  quantity?: number;
}

export interface Booking {
  id: string;
  user_id: string;
  date: string;
  start_time: string;
  end_time: string;
  amount_time: number;
  is_event: boolean;
  ground_id: string;
  target?: string;
  customer_note?: string;
  owner_note?: string;
  quantity: number;
  status: string;
  event_id?: string | null;
  ground?: {
    id: string;
    name: string;
    venue_id: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface BookingFilters {
  user_id?: string;
  venue_id?: string;
  date?: string;
  status?: string;
}

export interface BookingsResponse {
  data: Booking[];
}

export const bookingService = {
  async getAllBookings(filters?: BookingFilters): Promise<Booking[]> {
    const params: Record<string, string> = {};

    if (filters?.user_id) params.user_id = filters.user_id;
    if (filters?.venue_id) params.venue_id = filters.venue_id;
    if (filters?.date) params.date = filters.date;
    if (filters?.status) params.status = filters.status;

    const response = await apiClient.get<BookingsResponse>(
      API_ENDPOINTS.BOOKINGS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as BookingsResponse)?.data ||
      (response as any)?.data ||
      [];
    return Array.isArray(data) ? data : [];
  },

  async getMyBookings(): Promise<Booking[]> {
    const response = await apiClient.get<BookingsResponse>(
      API_ENDPOINTS.BOOKINGS.MY_BOOKINGS
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as BookingsResponse)?.data ||
      (response as any)?.data ||
      [];
    return Array.isArray(data) ? data : [];
  },

  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      API_ENDPOINTS.BOOKINGS.CREATE,
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Booking;
  },

  async updateBooking(
    id: string,
    data: Partial<CreateBookingData>
  ): Promise<Booking> {
    const response = await apiClient.put<Booking>(
      API_ENDPOINTS.BOOKINGS.UPDATE(id),
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Booking;
  },

  async deleteBooking(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.BOOKINGS.DELETE(id));
  },
};
