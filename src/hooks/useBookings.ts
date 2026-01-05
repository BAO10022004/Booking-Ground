import { useState, useEffect } from "react";
import { bookingService, type Booking as ApiBooking } from "../services";
import { formatTimeForAPI } from "../utils/helpers";
import Booking from "../models/booking";

export function useMyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rawBookings, setRawBookings] = useState<ApiBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getMyBookings();
        setRawBookings(data);

        const transformedBookings = data.map((b: ApiBooking) => {
          const booking = new Booking();
          booking.bookingId = b.id;
          booking.userId = b.user_id;
          booking.isEvent = b.is_event || false;
          booking.eventId = b.event_id || null;
          // Chỉ set date, time, ground nếu không phải event booking
          if (!b.is_event && b.date) {
            booking.date = new Date(b.date);
          } else {
            booking.date = null;
          }
          booking.startTime = b.start_time || null;
          booking.endTime = b.end_time || null;
          booking.amountTime = b.amount_time ?? null;
          booking.groundId = b.ground_id || null;
          booking.target = b.target || null;
          booking.customerNote = b.customer_note || null;
          booking.ownerNote = b.owner_note || null;
          booking.quantity = b.quantity || 1;
          booking.totalPrice = b.total_price ?? null;
          booking.status = b.status as any;
          return booking;
        });
        setBookings(transformedBookings);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load bookings")
        );
        setBookings([]);
        setRawBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const createBooking = async (data: {
    date?: string | null;
    start_time?: string | null;
    end_time?: string | null;
    ground_id?: string | null;
    is_event?: boolean;
    event_id?: string | null;
    target?: string;
    customer_note?: string;
    quantity?: number;
    total_price?: number;
  }) => {
    try {
      const bookingData: any = {
        ...data,
      };
      // Chỉ format time nếu có start_time và end_time (không phải event booking)
      if (data.start_time) {
        bookingData.start_time = formatTimeForAPI(data.start_time);
      }
      if (data.end_time) {
        bookingData.end_time = formatTimeForAPI(data.end_time);
      }
      const result = await bookingService.createBooking(bookingData);
      const booking = new Booking();
      booking.bookingId = result.id;
      booking.userId = result.user_id;
      booking.isEvent = result.is_event || false;
      booking.eventId = result.event_id || null;
      // Chỉ set date, time, ground nếu không phải event booking
      if (!result.is_event && result.date) {
        booking.date = new Date(result.date);
      } else {
        booking.date = null;
      }
      booking.startTime = result.start_time || null;
      booking.endTime = result.end_time || null;
      booking.amountTime = result.amount_time || null;
      booking.groundId = result.ground_id || null;
      booking.target = result.target || null;
      booking.customerNote = result.customer_note || null;
      booking.ownerNote = result.owner_note || null;
      booking.quantity = result.quantity || 1;
      booking.status = result.status as any;
      setBookings((prev) => [booking, ...prev]);
      return booking;
    } catch (err) {
      throw err;
    }
  };

  const updateBooking = async (
    id: string,
    data: {
      date?: string;
      start_time?: string;
      end_time?: string;
      ground_id?: string;
      customer_note?: string;
      quantity?: number;
    }
  ) => {
    try {
      const updateData: any = { ...data };
      if (data.start_time) {
        updateData.start_time = formatTimeForAPI(data.start_time);
      }
      if (data.end_time) {
        updateData.end_time = formatTimeForAPI(data.end_time);
      }
      const result = await bookingService.updateBooking(id, updateData);

      // Update local state
      setRawBookings((prev) => prev.map((b) => (b.id === id ? result : b)));
      setBookings((prev) =>
        prev.map((b) => {
          if (b.bookingId === id) {
            const updated = new Booking();
            updated.bookingId = result.id;
            updated.userId = result.user_id;
            updated.isEvent = result.is_event || false;
            updated.eventId = result.event_id || null;
            // Chỉ set date, time, ground nếu không phải event booking
            if (!result.is_event && result.date) {
              updated.date = new Date(result.date);
            } else {
              updated.date = null;
            }
            updated.startTime = result.start_time || null;
            updated.endTime = result.end_time || null;
            updated.amountTime = result.amount_time || null;
            updated.groundId = result.ground_id || null;
            updated.target = result.target || null;
            updated.customerNote = result.customer_note || null;
            updated.ownerNote = result.owner_note || null;
            updated.quantity = result.quantity || 1;
            updated.status = result.status as any;
            return updated;
          }
          return b;
        })
      );
      return result;
    } catch (err) {
      throw err;
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      await bookingService.deleteBooking(id);
      setRawBookings((prev) => prev.filter((b) => b.id !== id));
      setBookings((prev) => prev.filter((b) => b.bookingId !== id));
    } catch (err) {
      throw err;
    }
  };

  const refreshBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setRawBookings(data);

      const transformedBookings = data.map((b: ApiBooking) => {
        const booking = new Booking();
        booking.bookingId = b.id;
        booking.userId = b.user_id;
        booking.isEvent = b.is_event || false;
        booking.eventId = b.event_id || null;
        // Chỉ set date, time, ground nếu không phải event booking
        if (!b.is_event && b.date) {
          booking.date = new Date(b.date);
        } else {
          booking.date = null;
        }
        booking.startTime = b.start_time || null;
        booking.endTime = b.end_time || null;
        booking.amountTime = b.amount_time ?? null;
        booking.groundId = b.ground_id || null;
        booking.target = b.target || null;
        booking.customerNote = b.customer_note || null;
        booking.ownerNote = b.owner_note || null;
        booking.quantity = b.quantity || 1;
        booking.status = b.status as any;
        return booking;
      });
      setBookings(transformedBookings);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load bookings")
      );
      setBookings([]);
      setRawBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    bookings,
    rawBookings,
    loading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
    refreshBookings,
  };
}
