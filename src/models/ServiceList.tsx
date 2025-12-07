/**
 * Lớp đại diện cho Bảng Đánh giá (RRATINGS)
 */
class ServiceList {
  // ///////////////////////// Properties /////////////////////////
  
  /** (Not Null, Foreign Key) Tham chiếu Users.UserID (người đánh giá) */
  readonly  ServiceListID: string; 

  /** (Not Null, Foreign Key) Tham chiếu Venues.VenueID (sân được đánh giá) */
   Name: string; 

  /** (Not Null) Số sao đánh giá (VD: 1–5) */
  readonly VenueID: number; 

  
  // ///////////////////////// Constructor /////////////////////////
  constructor({
    ServiceListID,
    Name,
    VenueID,
  }: {
    ServiceListID: string;
    Name: string;
    VenueID: number;
  }) {
    // Các trường Foreign Key (Khóa kép)
    this.ServiceListID = ServiceListID;
    this.Name = Name;
    
    this.VenueID = VenueID;
    
    // Trường Nullable
  }
}

export default ServiceList;