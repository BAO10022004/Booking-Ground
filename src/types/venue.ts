// Shared Venue type definition - based on migration
export interface Venue {
  id: string;
  name: string;
  sub_address: string;
  district: string;
  city: string;
  address: string;
  operating_time: string;
  phone_number1: string;
  phone_number2?: string | null;
  website?: string | null;
  deposit: number;
  owner_id: string;
  created_at?: string;
  updated_at?: string;
  // Relationships (optional, loaded from API)
  owner?: {
    id: string;
    name: string;
  };
  categories?: Array<{
    id: string;
    name: string;
  }>;
  images?: Array<{
    id: string;
    name: string;
    image_url: string;
  }>;
  grounds?: Array<{
    id: string;
    name: string;
    venue_id: string;
    category_id: string;
  }>;
}
