import { venueService, type Venue } from "../services";

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

export default getVenues;
