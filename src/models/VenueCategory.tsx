/**
 * Lớp đại diện cho Bảng Quan hệ giữa Sân và Danh mục (VENUESCATEGORIES)
 */
class VenueCategory {
  // ///////////////////////// Properties /////////////////////////
  
  /** (FK, Not Null) Tham chiếu đến Venues.VenueID */
  readonly venueId: string; 

  /** (FK, Not Null) Tham chiếu đến Categories.CategoryID */
  readonly categoryId: string; 

  // ///////////////////////// Constructor /////////////////////////
  constructor({
    venueId,
    categoryId,
  }: {
    venueId: string;
    categoryId: string;
  }) {
    // Hai trường này tạo thành Khóa kép (Composite Key) và là Foreign Key
    this.venueId = venueId;
    this.categoryId = categoryId;
  }
}

export default VenueCategory;