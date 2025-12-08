/**
 * Lớp đại diện cho Bảng Quan hệ giữa Sân và Danh mục (VENUESCATEGORIES)
 */
class VenueCategory {
  // ///////////////////////// Properties /////////////////////////
  
  /** (FK, Not Null) Tham chiếu đến Venues.VenueID */
  readonly venueId: string; 

  /** (FK, Not Null) Tham chiếu đến Categories.CategoryID */
  readonly categoryId: string; 

  readonly priceId: string; 
  // ///////////////////////// Constructor /////////////////////////
  constructor({
    venueId,
    categoryId,
    priceId,
  }: {
    venueId: string;
    categoryId: string;
    priceId: string;
  }) {
    // Hai trường này tạo thành Khóa kép (Composite Key) và là Foreign Key
    this.venueId = venueId;
    this.categoryId = categoryId;
    this.priceId = priceId
  }
}

export default VenueCategory;