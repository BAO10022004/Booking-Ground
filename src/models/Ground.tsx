/**
 * Lớp đại diện cho Bảng Sân con (GROUNDS)
 * Sân con là các đơn vị sân riêng lẻ bên trong một Venue.
 */
class Ground {
  // ///////////////////////// Properties /////////////////////////
  
  /** (PK, Not Null) Mã sân con (Guid/UUID) */
  readonly groundId: string; 

  /** (Not Null) Tên sân con (VD: Sân A, Sân B, Sân 1, Sân 2) */
  name: string; 

  /** (FK, Not Null) Tham chiếu Venues.VenueID (sân cha) */
  venueId: string; 

  /** (FK, Not Null) Tham chiếu Categories.CategoryID */
  categoryId: string; 

  // ///////////////////////// Constructor /////////////////////////
  constructor({
    groundId,
    name,
    venueId,
    categoryId,
  }: {
    groundId: string;
    name: string;
    venueId: string;
    categoryId: string;
  }) {
    // Trường Readonly (PK)
    this.groundId = groundId;
    
    // Các trường Not Null
    this.name = name;
    this.venueId = venueId;
    this.categoryId = categoryId;
  }
}

export default Ground;