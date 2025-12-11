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
          booking.date = new Date(b.date);
          booking.startTime = b.start_time;
          booking.endTime = b.end_time;
          booking.amountTime = b.amount_time;
          booking.groundId = b.ground_id;
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
    date: string;
    start_time: string;
    end_time: string;
    ground_id: string;
    is_event?: boolean;
    event_id?: string | null;
    target?: string;
    customer_note?: string;
    quantity?: number;
  }) => {
    try {
      const bookingData = {
        ...data,
        start_time: formatTimeForAPI(data.start_time),
        end_time: formatTimeForAPI(data.end_time),
      };
      const result = await bookingService.createBooking(bookingData);
      const booking = new Booking();
      booking.bookingId = result.id;
      booking.userId = result.user_id;
      booking.date = new Date(result.date);
      booking.startTime = result.start_time;
      booking.endTime = result.end_time;
      booking.amountTime = result.amount_time;
      booking.groundId = result.ground_id;
      setBookings((prev) => [booking, ...prev]);
      return booking;
    } catch (err) {
      throw err;
    }
  };

  return { bookings, rawBookings, loading, error, createBooking };
}
