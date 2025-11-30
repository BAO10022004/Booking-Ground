class Venue {
  // ///////////////////////// Properties /////////////////////////
  
  readonly venueId: string; 

  /** (Not Null) Tên sân/CLB (VD: Sân Cầu lông Hoàng Mai) */
  name: string; 

  /** (Not Null) Số nhà, tên đường */
  subAddress: string; 

  /** (Not Null) Quận, huyện */
  district: string; 

  /** (Not Null) Tỉnh, thành phố */
  city: string; 

  /** (Not Null) Địa chỉ cụ thể (chuỗi đầy đủ) */
  address: string; 

  /** (Not Null) Giờ hoạt động (VD: 6:00 – 22:00) */
  operatingTime: string; 

  /** (Not Null, Unique) Số điện thoại liên hệ 1 */
  phoneNumber1: string; 

  /** (Null, Unique) Số điện thoại liên hệ 2 */
  phoneNumber2: string | null; 

  /** (Null) Website chính thức (nếu có) */
  website: string | null; 

  /** (Not Null, Default=0) Phần trăm tiền đặt cọc */
  deposit: number;

  /** (Not Null, Foreign Key) Tham chiếu đến Users.UserID (Role = OWNER) */
  ownerId: string; 

  // ///////////////////////// Constructor /////////////////////////
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

export default Venue;