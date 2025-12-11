import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface VenueFilters {
  category_id?: string;
  city?: string;
  district?: string;
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
      console.log("Services API Response (raw):", response);
      console.log("Services API Response.data:", response.data);

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
        console.warn("Services data format not recognized:", response);
        return [];
      }

      console.log("Services parsed data:", data);

      if (!Array.isArray(data)) {
        console.warn("Services data is not an array:", data);
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
      console.log("Services mapped result:", mapped);
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
      console.log("Terms API Response (raw):", response);
      console.log("Terms API Response.data:", response.data);

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
        console.warn("Terms data format not recognized:", response);
        return [];
      }

      console.log("Terms parsed data:", data);

      if (!Array.isArray(data)) {
        console.warn("Terms data is not an array:", data);
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

      console.log("Terms mapped result:", mapped);
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
      console.log("Price Lists API Response (raw):", response);
      console.log("Price Lists API Response.data:", response.data);

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
        console.warn("Price lists data format not recognized:", response);
        return [];
      }

      console.log("Price Lists parsed data:", data);

      if (!Array.isArray(data)) {
        console.warn("Price lists data is not an array:", data);
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
      console.log("Price Lists mapped result:", mapped);
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
};
