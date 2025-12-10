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

export interface PaymentsResponse {
  data: Payment[];
}

export const paymentService = {
  async getMyPayments(): Promise<Payment[]> {
    const response = await apiClient.get<PaymentsResponse>(
      API_ENDPOINTS.PAYMENTS.LIST
    );

    return (response.data as PaymentsResponse)?.data || [];
  },

  async createPayment(data: CreatePaymentData): Promise<Payment> {
    const response = await apiClient.post<Payment>(
      API_ENDPOINTS.PAYMENTS.CREATE,
      data
    );

    return response.data as Payment;
  },
};
