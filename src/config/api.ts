export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  TIMEOUT: 30000,
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  VENUES: {
    LIST: "/venues",
    DETAIL: (id: string) => `/venues/${id}`,
    SERVICES: (id: string) => `/venues/${id}/services`,
    TERMS: (id: string) => `/venues/${id}/terms`,
    PRICE_LISTS: (id: string) => `/venues/${id}/price-lists`,
    IMAGES: (id: string) => `/venues/${id}/images`,
  },
  CATEGORIES: {
    LIST: "/categories",
  },
  GROUNDS: {
    LIST: "/grounds",
  },
  EVENTS: {
    LIST: "/events",
  },
  BOOKINGS: {
    LIST: "/bookings",
    MY_BOOKINGS: "/bookings/my-bookings",
    CREATE: "/bookings",
    UPDATE: (id: string) => `/bookings/${id}`,
    DELETE: (id: string) => `/bookings/${id}`,
  },
  PAYMENTS: {
    LIST: "/payments",
    CREATE: "/payments",
  },
  RATINGS: {
    LIST: "/ratings",
    DETAIL: (id: string) => `/ratings/${id}`,
    CREATE: "/ratings",
    UPDATE: (id: string) => `/ratings/${id}`,
    DELETE: (id: string) => `/ratings/${id}`,
  },
  IMAGES: {
    UPLOAD: "/images/upload",
    GET: (id: string) => `/images/${id}`,
    DELETE: (id: string) => `/images/${id}`,
  },
};
