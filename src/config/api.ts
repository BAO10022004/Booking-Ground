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
    UPDATE: "/auth/update",
    CHANGE_PASSWORD: "/auth/change-password",
    DELETE_ACCOUNT: "/auth/delete-account",
  },
  VENUES: {
    LIST: "/venues",
    DETAIL: (id: string) => `/venues/${id}`,
    SERVICES: (id: string) => `/venues/${id}/services`,
    TERMS: (id: string) => `/venues/${id}/terms`,
    PRICE_LISTS: (id: string) => `/venues/${id}/price-lists`,
    PRICE_INFO: (venueId: string, categoryId: string) =>
      `/venues/${venueId}/categories/${categoryId}/price-info`,
    IMAGES: (id: string) => `/venues/${id}/images`,
    SCHEDULE: (id: string) => `/venues/${id}/schedule`,
    CALCULATE_PRICE: (id: string) => `/venues/${id}/calculate-price`,
    CREATE: "/venues",
    UPDATE: (id: string) => `/venues/${id}`,
    DELETE: (id: string) => `/venues/${id}`,
  },
  CATEGORIES: {
    LIST: "/categories",
    DETAIL: (id: string) => `/categories/${id}`,
    CREATE: "/categories",
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  GROUNDS: {
    LIST: "/grounds",
    DETAIL: (id: string) => `/grounds/${id}`,
    CREATE: "/grounds",
    UPDATE: (id: string) => `/grounds/${id}`,
    DELETE: (id: string) => `/grounds/${id}`,
  },
  EVENTS: {
    LIST: "/events",
    DETAIL: (id: string) => `/events/${id}`,
    CREATE: "/events",
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
  },
  BOOKINGS: {
    LIST: "/bookings",
    MY_BOOKINGS: "/bookings/my-bookings",
    DETAIL: (id: string) => `/bookings/${id}`,
    CREATE: "/bookings",
    UPDATE: (id: string) => `/bookings/${id}`,
    DELETE: (id: string) => `/bookings/${id}`,
    CONFIRM: (id: string) => `/bookings/${id}/confirm`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
  },
  PAYMENTS: {
    LIST: "/payments",
    MY_PAYMENTS: "/payments/my-payments",
    CREATE: "/payments",
    DETAIL: (id: string) => `/payments/${id}`,
    UPDATE: (id: string) => `/payments/${id}`,
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
  THINKING_SEARCH: {
    PREDICT: "/predict",
  },
  FAVORITES: {
    LIST: "/favorites",
    CREATE: "/favorites",
    DELETE: (venueId: string) => `/favorites/${venueId}`,
  },
};
