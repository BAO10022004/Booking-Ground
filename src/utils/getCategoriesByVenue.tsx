import Category from "../models/Category";
import VenueCategory from "../models/VenueCategory";
import GetListCategory from "./getCategory";
const venueCategoriesData: VenueCategory[] = [

  new VenueCategory({ venueId: 'v-132sg-001', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-132sg-001', categoryId: '2' }),
  new VenueCategory({ venueId: 'v-tpt-ldh-002', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-tpt-ldh-002', categoryId: '2' }),
  new VenueCategory({ venueId: 'v-pbht-003', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-nest-004', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-nest-004', categoryId: '2' }),
  new VenueCategory({ venueId: 'v-hua-005', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-tanhoa-006', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-bpb-007', categoryId: '1' }),
  new VenueCategory({ venueId: 'v-bpb-007', categoryId: '2' }),
  new VenueCategory({ venueId: 'v-hita-008', categoryId: '1' }),
];


 function getCategoriesByVenue(venueId: string): Category[] {
    const categoryIds = venueCategoriesData
      .filter(vc => vc.venueId === venueId)
      .map(vc => vc.categoryId);
    const categories = GetListCategory().filter(cat => categoryIds.includes(cat.categoryId));
    return categories;
}
export default getCategoriesByVenue ;