import { useState, useEffect } from "react";
import { eventService, type Event as ApiEvent } from "../services";

export interface Event {
  id: string;
  name: string;
  price: number;
  ticket_number: number;
  level?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  venue_id?: string;
  ground_id?: string;
  description?: string;
}

export function useEvents(filters?: { search?: string }) {
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
          date: e.date,
          start_time: e.start_time,
          end_time: e.end_time,
          venue_id: e.venue_id,
          ground_id: e.ground_id,
          description: e.description,
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
  }, [filters?.search]);

  return { events, loading, error };
}
