import { useState, useEffect } from "react";
import { eventService, type Event as ApiEvent } from "../services";

export interface Event {
  id: string;
  name: string;
  price: number;
  ticket_number: number;
  level?: string;
  venue_id?: string;
  start_date?: string | null;
  end_date?: string | null;
}

export function useEvents(filters?: { search?: string; venue_id?: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getAllEvents(filters);
        const transformedEvents = data.map((e: ApiEvent) => ({
          id: e.id,
          name: e.name,
          price: e.price,
          ticket_number: e.ticket_number,
          level: e.level,
          venue_id: e.venue_id,
          start_date: e.start_date,
          end_date: e.end_date,
        })) as Event[];
        setEvents(transformedEvents);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load events")
        );
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters?.search, filters?.venue_id]);

  return { events, loading, error };
}
