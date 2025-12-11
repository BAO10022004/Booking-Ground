import { useState, useEffect } from "react";
import {
  venueService,
  type ServiceList,
  type Term,
  type PriceList,
  type VenueImage,
} from "../services";

export function useVenueServices(venueId: string | undefined) {
  const [services, setServices] = useState<ServiceList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!venueId) {
      setLoading(false);
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenueServices(venueId);
        setServices(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load services")
        );
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [venueId]);

  return { services, loading, error };
}

export function useVenueTerms(venueId: string | undefined) {
  const [terms, setTerms] = useState<Term[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!venueId) {
      setLoading(false);
      return;
    }

    const fetchTerms = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenueTerms(venueId);
        setTerms(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load terms")
        );
        setTerms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [venueId]);

  return { terms, loading, error };
}

export function useVenuePriceLists(venueId: string | undefined) {
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!venueId) {
      setLoading(false);
      return;
    }

    const fetchPriceLists = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenuePriceLists(venueId);
        setPriceLists(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load price lists")
        );
        setPriceLists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceLists();
  }, [venueId]);

  return { priceLists, loading, error };
}

export function useVenueImages(
  venueId: string | undefined,
  type?: string | boolean
) {
  const [images, setImages] = useState<VenueImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!venueId) {
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenueImages(venueId, type);
        setImages(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load images")
        );
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [venueId, type]);

  return { images, loading, error };
}
