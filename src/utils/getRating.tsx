import { Venue } from "../models/Venue";

function GetRating(venue: Venue) {
  return 5;
}
import Venue from "../models/Venue";
import { ratingService } from "../services";

// Cache để tránh gọi API nhiều lần
const ratingCache = new Map<string, number>();

async function GetRating(venue: Venue): Promise<number | null> {
  if (!venue?.venueId) return null;

  // Kiểm tra cache
  if (ratingCache.has(venue.venueId)) {
    return ratingCache.get(venue.venueId) || null;
  }

  try {
    const ratings = await ratingService.getAllRatings({
      venue_id: venue.venueId,
    });

    if (ratings.length === 0) {
      ratingCache.set(venue.venueId, 0);
      return null; // Không có rating
    }

    // Tính average rating
    const totalStars = ratings.reduce((sum, r) => sum + r.star_number, 0);
    const averageRating = totalStars / ratings.length;
    const roundedRating = Math.round(averageRating * 10) / 10; // Làm tròn 1 chữ số

    ratingCache.set(venue.venueId, roundedRating);
    return roundedRating;
  } catch (error) {
    console.error("Error fetching rating:", error);
    return null;
  }
}

export default GetRating;
