/**
 * Lớp đại diện cho Bảng Đánh giá (RRATINGS)
 */
class Rating {
  // ///////////////////////// Properties /////////////////////////
  
  /** (Not Null, Foreign Key) Tham chiếu Users.UserID (người đánh giá) */
  readonly userId: string; 

  /** (Not Null, Foreign Key) Tham chiếu Venues.VenueID (sân được đánh giá) */
  readonly venueId: string; 

  /** (Not Null) Số sao đánh giá (VD: 1–5) */
  starNumber: number; 

  /** (Null) Nội dung nhận xét, đánh giá của người dùng */
  review: string | null; 

  // ///////////////////////// Constructor /////////////////////////
  constructor({
    userId,
    venueId,
    starNumber,
    review = null,
  }: {
    userId: string;
    venueId: string;
    starNumber: number;
    review?: string | null;
  }) {
    // Các trường Foreign Key (Khóa kép)
    this.userId = userId;
    this.venueId = venueId;
    
    // Trường Not Null
    this.starNumber = starNumber;
    
    // Trường Nullable
    this.review = review;
  }
}

export default Rating;