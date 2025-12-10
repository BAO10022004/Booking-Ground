import Category from "../models/Category";
import GetListCategory from "./getCategory";

async function getCategoriesByVenue(venueId: string): Promise<Category[]> {
  try {
    const categories = await GetListCategory();
    const venue = await import("../services").then((m) =>
      m.venueService.getVenueById(venueId)
    );

    if (venue?.categories) {
      return venue.categories.map((cat) => ({
        categoryId: cat.id,
        name: cat.name,
      })) as Category[];
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories by venue:", error);
    return [];
  }
}

export default getCategoriesByVenue;
