import { eventService } from "../services";
import { Event } from "../models/Event";

export async function hasEvent(groundId: string): Promise<boolean> {
  try {
    const events = await eventService.getAllEvents();
    return events.some((e) => e.ground_id === groundId);
  } catch (error) {
    console.error("Error checking events:", error);
    return false;
  }
}

export async function getEventsByGround(groundId: string): Promise<Event[]> {
  try {
    const events = await eventService.getAllEvents();
    return events
      .filter((e) => e.ground_id === groundId)
      .map(
        (e) =>
          new Event({
            groundId: e.ground_id || e.id,
            name: e.name,
            price: e.price,
            ticketNumber: e.ticket_number,
            level: e.level || undefined,
          })
      );
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}
