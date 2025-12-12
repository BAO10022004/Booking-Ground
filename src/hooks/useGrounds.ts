import { useState, useEffect } from "react";
import { groundService, type Ground as ApiGround } from "../services";
import Ground from "../models/Ground";

export function useGrounds(venueId?: string) {
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        setLoading(true);
        const data = await groundService.getAllGrounds(
          venueId ? { venue_id: venueId } : undefined
        );
        const transformedGrounds = data.map(
          (g: ApiGround) =>
            new Ground({
              groundId: g.id,
              name: g.name,
              venueId: g.venue_id,
              categoryId: g.category_id,
            })
        );
        setGrounds(transformedGrounds);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to load grounds")
        );
        setGrounds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGrounds();
  }, [venueId]);

  return { grounds, loading, error };
}
