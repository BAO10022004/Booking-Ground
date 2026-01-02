import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "../config/api";

export interface RegisterData {
  phone_number: string;
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
  gender: boolean;
  birthday: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender?: boolean;
  birthday?: string;
  role?: boolean;
  is_admin?: boolean;
  is_active?: boolean;
  avatar_id?: string;
  cover_image_id?: string;
}

export interface AuthResponse {
  message?: string;
  user: User;
  access_token?: string;
  token?: string;
  token_type?: string;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const authData = (response.data || response) as AuthResponse;
    const token = authData?.access_token || authData?.token;

    if (token) {
      apiClient.setAuthToken(token);
    }

    return authData;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );

    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    const authData = (response.data || response) as AuthResponse;

    if (!authData || !authData.user) {
      throw new Error("Invalid response from server: missing user data");
    }

    const token = authData?.access_token || authData?.token;

    if (token) {
      apiClient.setAuthToken(token);
    }

    return authData;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      apiClient.clearAuthToken();
    }
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    // Response có thể là data trực tiếp hoặc wrapped trong { data: ... }
    return (response.data || response) as User;
  },

  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  },
};
