import { useState, useEffect } from "react";
import { venueService, type Venue as ApiVenue } from "../services";
import { Venue } from "../models/Venue";

interface VenueFilters {
  category_id?: string;
  city?: string;
  district?: string;
  search?: string;
}

export function useVenues(filters?: VenueFilters) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const data = await venueService.getAllVenues(filters);
        const transformedVenues = data.map((v: ApiVenue) => ({
          venueId: v.id,
          name: v.name,
          subAddress: v.sub_address,
          district: v.district,
          city: v.city,
          address: v.address,
          operatingTime: v.operating_time,
          phoneNumber1: v.phone_number1,
          phoneNumber2: v.phone_number2,
          website: v.website,
          deposit: v.deposit,
          ownerId: v.owner?.id || "",
          image: v.images?.[0]?.image_url || "",
        })) as Venue[];
        setVenues(transformedVenues);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load venues")
        );
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [filters?.category_id, filters?.city, filters?.district, filters?.search]);

  return { venues, loading, error };
}

export function useVenue(id: string | undefined) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchVenue = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenueById(id);
        const transformedVenue = {
          venueId: data.id,
          name: data.name,
          subAddress: data.sub_address || "",
          district: data.district || "",
          city: data.city || "",
          address: data.address,
          operatingTime: data.operating_time || "",
          phoneNumber1: data.phone_number1 || "",
          phoneNumber2: data.phone_number2 || null,
          website: data.website || null,
          deposit: data.deposit || 0,
          ownerId: data.owner?.id || "",
          image: data.images?.[0]?.image_url || "",
          categories: data.categories || [],
          images: data.images || [],
        } as any;
        setVenue(transformedVenue);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load venue")
        );
        setVenue(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  return { venue, loading, error };
}
