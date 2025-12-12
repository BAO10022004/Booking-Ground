import { venueService } from "../services";
import { getVenueById } from "./selectors/venueSelectors";
import type { Venue } from "../models/Venue";

async function getVenues(filters?: {
  category_id?: string;
  city?: string;
  search?: string;
}) {
  try {
    const venues = await venueService.getAllVenues(filters);
    return venues;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
}

export async function getVenuesById(id: string): Promise<Venue | null> {
  return getVenueById(id);
}

export default getVenues;
