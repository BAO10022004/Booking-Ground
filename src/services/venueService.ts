import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";
import type { Venue } from "../types/venue";

export interface VenueFilters {
  category_id?: string;
  city?: string;
  district?: string;
  search?: string;
}

// Re-export Venue type for backward compatibility
export type { Venue };

export interface VenuesResponse {
  data: Venue[];
}

export interface ServiceList {
  id: string;
  name: string;
  venue_id?: string;
  details: Array<{
    id: string;
    name: string;
    wholesale: string;
    unit_wholesale: string;
    retail: string;
    unit_retail: string;
  }>;
}

export interface Term {
  id: string;
  term_category: number;
  category_name: string;
  content: string;
  update_time?: string;
  venue_id?: string;
}

export interface TermsResponse {
  data: Term[];
}

export interface PriceList {
  id: string;
  name: string;
  currency: string;
  category_id?: string;
  details: Array<{
    id: string;
    date?: string;
    day?: string;
    start_time: string;
    end_time: string;
    price?: number;
    fixed_price?: number;
    current_price: number;
  }>;
}

export interface VenueImage {
  id: string;
  name: string;
  image_url: string;
  is_image?: boolean;
  type?: string;
  order?: number;
}

export const venueService = {
  async getAllVenues(filters?: VenueFilters): Promise<Venue[]> {
    const params: Record<string, string> = {};

    if (filters?.category_id) params.category_id = filters.category_id;
    if (filters?.city) params.city = filters.city;
    if (filters?.district) params.district = filters.district;
    if (filters?.search) params.search = filters.search;

    const response = await apiClient.get<VenuesResponse>(
      API_ENDPOINTS.VENUES.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as VenuesResponse)?.data || (response as any)?.data || [];
    return Array.isArray(data) ? data : [];
  },

  async getVenueById(id: string): Promise<Venue> {
    const response = await apiClient.get<Venue>(
      API_ENDPOINTS.VENUES.DETAIL(id)
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Venue;
  },

  async getVenueServices(venueId: string): Promise<ServiceList[]> {
    try {
      const response = await apiClient.get<any>(
        API_ENDPOINTS.VENUES.SERVICES(venueId)
      );

      let data: any[] = [];

      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        data = response.data.data;
      } else if (
        (response as any).data &&
        Array.isArray((response as any).data)
      ) {
        data = (response as any).data;
      } else {
        return [];
      }

      if (!Array.isArray(data)) {
        return [];
      }

      const mapped = data.map((item: any) => {
        const details =
          item.details || item.services || item.service_list_details || [];
        return {
          id: item.id || "",
          name: item.name || "",
          venue_id: item.venue_id,
          details: Array.isArray(details)
            ? details.map((s: any) => ({
                id: s.id || "",
                name: s.name || "",
                wholesale: s.wholesale || "",
                unit_wholesale: s.unit_wholesale || "",
                retail: s.retail || "",
                unit_retail: s.unit_retail || "",
              }))
            : [],
        };
      });
      return mapped;
    } catch (error) {
      console.error("Error fetching venue services:", error);
      throw error;
    }
  },

  async getVenueTerms(venueId: string): Promise<Term[]> {
    try {
      const response = await apiClient.get<any>(
        API_ENDPOINTS.VENUES.TERMS(venueId)
      );

      let data: any[] = [];

      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        data = response.data.data;
      } else {
        return [];
      }

      if (!Array.isArray(data)) {
        return [];
      }

      const mapped = data.map((term: any) => ({
        id: term.id || "",
        term_category: term.term_category || 0,
        category_name: this.getTermCategoryName(term.term_category),
        content: term.content || "",
        update_time: term.update_time,
        venue_id: term.venue_id,
      }));

      return mapped;
    } catch (error) {
      console.error("Error fetching venue terms:", error);
      throw error;
    }
  },

  getTermCategoryName(category: number): string {
    const categoryNames: Record<number, string> = {
      1: "Điều khoản đặt sân",
      2: "Quy định đặt sân & thời gian tối thiểu",
      3: "Chính sách hoàn tiền & huỷ lịch",
      4: "Quy định chuyển nhượng/đổi lịch đặt",
      5: "Chính sách xử lý khi điều kiện bất khả kháng",
    };
    return categoryNames[category] || `Danh mục ${category}`;
  },

  async getVenuePriceLists(venueId: string): Promise<PriceList[]> {
    try {
      const response = await apiClient.get<any>(
        API_ENDPOINTS.VENUES.PRICE_LISTS(venueId)
      );

      let data: any[] = [];

      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        data = response.data.data;
      } else if (
        (response as any).data &&
        Array.isArray((response as any).data)
      ) {
        data = (response as any).data;
      } else {
        return [];
      }

      if (!Array.isArray(data)) {
        return [];
      }

      const mapped = data.map((item: any) => {
        const details = item.details || item.price_list_details || [];
        return {
          id: item.id || "",
          name: item.name || "",
          currency: item.currency || "",
          category_id: item.category_id,
          details: Array.isArray(details)
            ? details.map((d: any) => ({
                id: d.id || "",
                date: d.date,
                day: d.day,
                start_time: d.start_time || "",
                end_time: d.end_time || "",
                price: d.price,
                fixed_price: d.fixed_price,
                current_price: d.current_price || 0,
              }))
            : [],
        };
      });
      return mapped;
    } catch (error) {
      console.error("Error fetching venue price lists:", error);
      throw error;
    }
  },

  async getVenueImages(
    venueId: string,
    type?: string | boolean
  ): Promise<VenueImage[]> {
    const params: Record<string, string> = {};
    if (type !== undefined) {
      params.type = String(type);
    }
    const response = await apiClient.get<{ data: VenueImage[] }>(
      API_ENDPOINTS.VENUES.IMAGES(venueId),
      Object.keys(params).length > 0 ? params : undefined
    );
    const data =
      (response.data as { data: VenueImage[] })?.data ||
      (response as any)?.data ||
      [];
    return Array.isArray(data) ? data : [];
  },

  async getVenueSchedule(
    venueId: string,
    date: string,
    categoryId?: string
  ): Promise<{
    booked: string[]; // Format: "groundId-timeSlot" e.g., "A-8:00"
    locked: string[];
    events: string[];
  }> {
    const params: Record<string, string> = { date };
    if (categoryId) params.category_id = categoryId;

    const response = await apiClient.get<{
      booked: string[];
      locked: string[];
      events: string[];
    }>(API_ENDPOINTS.VENUES.SCHEDULE(venueId), params);

    return (response.data || response) as {
      booked: string[];
      locked: string[];
      events: string[];
    };
  },

  async calculatePrice(data: {
    venueId: string;
    date: string;
    startTime: string;
    endTime: string;
    groundId: string;
    categoryId?: string;
    target?: string;
  }): Promise<{ totalPrice: number; totalHours: number }> {
    const response = await apiClient.post<{
      totalPrice: number;
      totalHours: number;
    }>(API_ENDPOINTS.VENUES.CALCULATE_PRICE(data.venueId), data);

    return (response.data || response) as {
      totalPrice: number;
      totalHours: number;
    };
  },

  async getPriceInfo(
    venueId: string,
    categoryId: string
  ): Promise<{
    venueId: string;
    categoryId: string;
    priceId: string | null;
    prices: Array<{
      id: string;
      date: string | null;
      day: string | null;
      start_time: string;
      end_time: string;
      fixed_price: number | null;
      current_price: number | null;
    }>;
  }> {
    const response = await apiClient.get<{
      venueId: string;
      categoryId: string;
      priceId: string | null;
      prices: Array<{
        id: string;
        date: string | null;
        day: string | null;
        start_time: string;
        end_time: string;
        fixed_price: number | null;
        current_price: number | null;
      }>;
    }>(API_ENDPOINTS.VENUES.PRICE_INFO(venueId, categoryId));

    return (response.data || response) as {
      venueId: string;
      categoryId: string;
      priceId: string | null;
      prices: Array<{
        id: string;
        date: string | null;
        day: string | null;
        start_time: string;
        end_time: string;
        fixed_price: number | null;
        current_price: number | null;
      }>;
    };
  },
};
