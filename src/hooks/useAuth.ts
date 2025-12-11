import { useState, useEffect } from "react";
import { authService, type User } from "../services";
import Account from "../models/account";

export function useAuth() {
  const [user, setUser] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          const account = new Account({
            fullName: userData.name,
            email: userData.email,
            phoneNumber: userData.phone_number,
            password: "",
            userId: userData.id,
            gender: userData.gender ?? false,
            birthday: userData.birthday
              ? new Date(userData.birthday)
              : new Date(),
            role: userData.role ?? false,
            isAdmin: userData.is_admin ?? false,
            isActive: userData.is_active ?? true,
            avatarId: userData.avatar_id || false,
            coverImageId: userData.cover_image_id || false,
          });
          setUser(account);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });

      if (!response || !response.user) {
        throw new Error("Invalid response from server");
      }

      const account = new Account({
        fullName: response.user.name,
        email: response.user.email,
        phoneNumber: response.user.phone_number,
        password: "",
        userId: response.user.id,
        gender: response.user.gender ?? false,
        birthday: response.user.birthday
          ? new Date(response.user.birthday)
          : new Date(),
        role: response.user.role ?? false,
        isAdmin: response.user.is_admin ?? false,
        isActive: response.user.is_active ?? true,
        avatarId: response.user.avatar_id || false,
        coverImageId: response.user.cover_image_id || false,
      });
      setUser(account);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const register = async (data: {
    phone_number: string;
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
    gender: boolean;
    birthday: string;
  }) => {
    try {
      const response = await authService.register(data);

      if (!response || !response.user) {
        throw new Error("Invalid response from server");
      }

      const account = new Account({
        fullName: response.user.name,
        email: response.user.email,
        phoneNumber: response.user.phone_number,
        password: "",
        userId: response.user.id,
        gender: response.user.gender ?? false,
        birthday: response.user.birthday
          ? new Date(response.user.birthday)
          : new Date(),
        role: response.user.role ?? false,
        isAdmin: response.user.is_admin ?? false,
        isActive: response.user.is_active ?? true,
        avatarId: response.user.avatar_id || false,
        coverImageId: response.user.cover_image_id || false,
      });
      setUser(account);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  };
}
