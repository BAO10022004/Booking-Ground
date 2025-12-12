import { venueService } from "../../services";
import { Venue } from "../../models/Venue";

export async function getVenueById(venueId: string): Promise<Venue | null> {
  try {
    const data = await venueService.getVenueById(venueId);
    return {
      venueId: data.id,
      name: data.name,
      subAddress: data.sub_address,
      district: data.district,
      city: data.city,
      address: data.address,
      operatingTime: data.operating_time,
      phoneNumber1: data.phone_number1,
      phoneNumber2: data.phone_number2,
      website: data.website,
      deposit: data.deposit,
      ownerId: data.owner?.id || "",
      image: data.images?.[0]?.image_url || "",
    } as Venue;
  } catch (error) {
    console.error("Error fetching venue:", error);
    return null;
  }
}
