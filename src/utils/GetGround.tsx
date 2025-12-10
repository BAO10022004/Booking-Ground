import { groundService } from "../services";
import Ground from "../models/Ground";

async function GetGroundByVenue(venueId: string) {
  try {
    const grounds = await groundService.getAllGrounds({ venue_id: venueId });
    return grounds.map(
      (ground) =>
        new Ground({
          groundId: ground.id,
          name: ground.name,
          venueId: ground.venue_id,
          categoryId: ground.category_id,
        })
    );
  } catch (error) {
    console.error("Error fetching grounds:", error);
    return [];
  }
}

export default GetGroundByVenue;
