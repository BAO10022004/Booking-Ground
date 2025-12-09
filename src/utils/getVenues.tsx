import { parseVenuesFromJSON } from "../models/Venue";
import venueData from "../../notebooks/data/raw/venue.json";

function getVenues() {
  return parseVenuesFromJSON(venueData);
}

export default getVenues;