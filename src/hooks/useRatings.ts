import { useState, useEffect, useMemo } from "react";
import { ratingService, type Rating as ApiRating } from "../services";

export interface Rating {
  id?: string;
  user_id: string;
  venue_id: string;
  star_number: number;
  review?: string;
  created_at?: string;
  user?: {
    id: string;
    name: string;
    email?: string;
    phone_number?: string;
    avatar?: {
      image_url?: string;
      full_url?: string;
    };
  };
}

// Cache để tránh gọi API nhiều lần
const ratingsCache = new Map<string, Rating[]>();
const averageCache = new Map<string, number | null>();

export function useRatings(venueIds?: string[]) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        // Nếu có venueIds, filter theo venue_id
        let data: Rating[] = [];
        if (venueIds && venueIds.length > 0) {
          // Fetch ratings cho từng venue
          const promises = venueIds.map((venueId) =>
            ratingService.getAllRatings({ venue_id: venueId })
          );
          const results = await Promise.all(promises);
          data = results.flat();
        } else {
          // Load tất cả ratings nếu không có filter
          data = await ratingService.getAllRatings();
        }
        setRatings(data);

        // Update cache
        data.forEach((rating) => {
          const venueId = rating.venue_id;
          if (!ratingsCache.has(venueId)) {
            ratingsCache.set(venueId, []);
          }
          ratingsCache.get(venueId)!.push(rating);
        });

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load ratings")
        );
        setRatings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  // Helper function để tính average rating cho một venue
  const getAverageRating = (venueId: string): number | null => {
    // Kiểm tra cache trước
    if (averageCache.has(venueId)) {
      return averageCache.get(venueId) || null;
    }

    const venueRatings = ratings.filter((r) => r.venue_id === venueId);
    if (venueRatings.length === 0) {
      averageCache.set(venueId, null);
      return null;
    }

    const totalStars = venueRatings.reduce((sum, r) => sum + r.star_number, 0);
    const average = totalStars / venueRatings.length;
    const rounded = Math.round(average * 10) / 10;

    averageCache.set(venueId, rounded);
    return rounded;
  };

  return { ratings, loading, error, getAverageRating };
}
