import Category from "../models/Category";
import VenueCategory from "../models/VenueCategory";
import GetListCategory from "./getCategory";
const venueCategoriesData: VenueCategory[] = [

   new VenueCategory({ venueId: 'v-132sg-001', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }), // Cầu lông
  new VenueCategory({ venueId: 'v-132sg-001', categoryId: 'c4e2f8d1-7b3e-4e5c-9bf9-11a9d714ff02' }), // Bóng đá

  new VenueCategory({ venueId: 'v-tpt-ldh-002', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),
  new VenueCategory({ venueId: 'v-tpt-ldh-002', categoryId: 'c4e2f8d1-7b3e-4e5c-9bf9-11a9d714ff02' }),

  new VenueCategory({ venueId: 'v-pbht-003', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),

  new VenueCategory({ venueId: 'v-nest-004', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),
  new VenueCategory({ venueId: 'v-nest-004', categoryId: 'c4e2f8d1-7b3e-4e5c-9bf9-11a9d714ff02' }),

  new VenueCategory({ venueId: 'v-hua-005', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),

  new VenueCategory({ venueId: 'v-tanhoa-006', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),

  new VenueCategory({ venueId: 'v-bpb-007', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),
  new VenueCategory({ venueId: 'v-bpb-007', categoryId: 'c4e2f8d1-7b3e-4e5c-9bf9-11a9d714ff02' }),

  new VenueCategory({ venueId: 'v-hita-008', categoryId: 'a1f3b6e4-2c9a-4c1b-b8a2-9c0d4fe71201' }),

];


 function getCategoriesByVenue(venueId: string): Category[] {
    const categoryIds = venueCategoriesData
      .filter(vc => vc.venueId === venueId)
      .map(vc => vc.categoryId);
    const categories = GetListCategory().filter(cat => categoryIds.includes(cat.categoryId));
    return categories;
}
export default getCategoriesByVenue ;