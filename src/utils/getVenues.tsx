import { parseVenuesFromJSON } from "../models/Venue";
import venueData from "../../notebooks/data/raw/venue.json";

function getVenues() {
  return parseVenuesFromJSON(venueData);
}
function getVenuesById(id: string) {
  return parseVenuesFromJSON(venueData).find(e => e.venueId === id);
}

export default getVenues;
export {getVenuesById}