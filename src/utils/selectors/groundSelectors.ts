import { groundService } from "../../services";
import Ground from "../../models/Ground";

export async function getGroundById(groundId: string): Promise<Ground | null> {
  try {
    const grounds = await groundService.getAllGrounds();
    const ground = grounds.find((g) => g.id === groundId);
    if (!ground) return null;

    return new Ground({
      groundId: ground.id,
      name: ground.name,
      venueId: ground.venue_id,
      categoryId: ground.category_id,
    });
  } catch (error) {
    console.error("Error fetching ground:", error);
    return null;
  }
}

export async function getGroundsByVenue(venueId: string): Promise<Ground[]> {
  try {
    const grounds = await groundService.getAllGrounds({ venue_id: venueId });
    return grounds.map(
      (g) =>
        new Ground({
          groundId: g.id,
          name: g.name,
          venueId: g.venue_id,
          categoryId: g.category_id,
        })
    );
  } catch (error) {
    console.error("Error fetching grounds:", error);
    return [];
  }
}
