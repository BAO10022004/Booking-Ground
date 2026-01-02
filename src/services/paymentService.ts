import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface CreatePaymentData {
  booking_id: string;
  amount: number;
  unit_price: number;
  method: "Cash" | "Card" | "Online";
  note?: string;
}

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  unit_price: number;
  method: string;
  note?: string;
  status: string;
  booking?: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
  };
}

export interface PaymentFilters {
  booking_id?: string;
  status?: string;
}

export interface PaymentsResponse {
  data: Payment[];
}

export const paymentService = {
  async getAllPayments(filters?: PaymentFilters): Promise<Payment[]> {
    const params: Record<string, string> = {};

    if (filters?.booking_id) params.booking_id = filters.booking_id;
    if (filters?.status) params.status = filters.status;

    const response = await apiClient.get<PaymentsResponse>(
      API_ENDPOINTS.PAYMENTS.LIST,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as PaymentsResponse)?.data ||
      (response as any)?.data ||
      [];
    return Array.isArray(data) ? data : [];
  },

  async getMyPayments(filters?: PaymentFilters): Promise<Payment[]> {
    const params: Record<string, string> = {};

    if (filters?.booking_id) params.booking_id = filters.booking_id;
    if (filters?.status) params.status = filters.status;

    const response = await apiClient.get<PaymentsResponse>(
      API_ENDPOINTS.PAYMENTS.MY_PAYMENTS,
      Object.keys(params).length > 0 ? params : undefined
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const data =
      (response.data as PaymentsResponse)?.data ||
      (response as any)?.data ||
      [];
    return Array.isArray(data) ? data : [];
  },

  async getPaymentById(id: string): Promise<Payment> {
    const response = await apiClient.get<Payment>(
      API_ENDPOINTS.PAYMENTS.DETAIL(id)
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Payment;
  },

  async createPayment(data: CreatePaymentData): Promise<Payment> {
    const response = await apiClient.post<Payment>(
      API_ENDPOINTS.PAYMENTS.CREATE,
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Payment;
  },

  async updatePayment(
    id: string,
    data: Partial<CreatePaymentData & { status?: string }>
  ): Promise<Payment> {
    const response = await apiClient.put<Payment>(
      API_ENDPOINTS.PAYMENTS.UPDATE(id),
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as Payment;
  },
};
