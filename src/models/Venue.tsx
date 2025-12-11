class Venue {
  readonly venueId: string;
  name: string;
  subAddress: string;
  district: string;
  city: string;
  address: string;
  operatingTime: string;
  phoneNumber1: string;
  phoneNumber2: string | null;
  website: string | null;
  deposit: number;
  ownerId: string;

  constructor({
    venueId,
    name,
    subAddress,
    district,
    city,
    address,
    operatingTime,
    phoneNumber1,
    phoneNumber2 = null,
    website = null,
    deposit = 0,
    ownerId,
  }: {
    venueId: string;
    name: string;
    subAddress: string;
    district: string;
    city: string;
    address: string;
    operatingTime: string;
    phoneNumber1: string;
    phoneNumber2?: string | null;
    website?: string | null;
    deposit?: number;
    ownerId: string;
  }) {
    this.venueId = venueId;
    this.name = name;
    this.subAddress = subAddress;
    this.district = district;
    this.city = city;
    this.address = address;
    this.operatingTime = operatingTime;
    this.phoneNumber1 = phoneNumber1;
    this.phoneNumber2 = phoneNumber2;
    this.website = website;
    this.deposit = deposit;
    this.ownerId = ownerId;
  }
}

// Interface cho raw JSON data
interface VenueRawData {
  venueId: string;
  name: string;
  subAddress: string;
  phuong?: string;
  district: string;
  Quận?: string;
  city: string;
  Thành?: string;
  address: string;
  Phường?: string;
  operatingTime: string;
  phoneNumber1: string;
  phoneNumber2: string | null;
  website: string | null;
  deposit: number;
  ownerId: string;
  image?: string;
  Pickleball?: string;
}

interface VenuesJSON {
  venues: VenueRawData[];
}

/**
 * Parse danh sách venues từ JSON data
 * @param jsonData - Object chứa mảng venues
 * @returns Mảng các Venue objects
 */
function parseVenuesFromJSON(jsonData: VenuesJSON): Venue[] {
  return jsonData.venues.map((venueData) => {
    return new Venue({
      venueId: venueData.venueId,
      name: venueData.name,
      subAddress: venueData.subAddress,
      district: venueData.district,
      city: venueData.city,
      address: venueData.address,
      operatingTime: venueData.operatingTime,
      phoneNumber1: venueData.phoneNumber1,
      phoneNumber2: venueData.phoneNumber2,
      website: venueData.website,
      deposit: venueData.deposit,
      ownerId: venueData.ownerId,
    });
  });
}

/**
 * Parse venues từ JSON string
 * @param jsonString - Chuỗi JSON
 * @returns Mảng Venue objects
 */
function parseVenuesFromString(jsonString: string): Venue[] {
  try {
    const jsonData: VenuesJSON = JSON.parse(jsonString);
    return parseVenuesFromJSON(jsonData);
  } catch (error) {
    console.error('Error parsing venues from string:', error);
    throw error;
  }
}

export { Venue, parseVenuesFromJSON, parseVenuesFromString };
export type { VenueRawData, VenuesJSON };