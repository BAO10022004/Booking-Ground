/**
 * Lớp đại diện cho bảng giá chi tiết (PRICE)
 * Mỗi bản ghi mô tả giá áp dụng theo ngày hoặc theo thứ + khung giờ.
 */
class Price {
  // ///////////////////////// Properties /////////////////////////

  /** (PK, Not Null) Mã chi tiết bảng giá (Guid/UUID) */
  readonly priceId: string;

  /** (Null) Ngày áp dụng cụ thể (VD: 2025-04-30) */
  date?: Date | null;

  /** (Null) Ngày trong tuần (VD: 'T2 - T5') */
  day?: string | null;

  /** (Not Null) Giờ bắt đầu */
  startTime: string; // HH:mm:ss

  /** (Not Null) Giờ kết thúc */
  endTime: string; // HH:mm:ss

  /** (Null) Giá cố định (cho khách đặt cố định) */
  fixedPrice?: number | null;

  /** (Not Null) Giá vãng lai (cho khách đặt 1 lần) */
  currentPrice: number;

  // ///////////////////////// Constructor /////////////////////////
  constructor({
    priceId,
    date = null,
    day = null,
    startTime,
    endTime,
    fixedPrice = null,
    currentPrice,
  }: {
    priceId: string;
    date?: Date | null;
    day?: string | null;
    startTime: string;
    endTime: string;
    fixedPrice?: number | null;
    currentPrice: number;
  }) {
    this.priceId = priceId;

    // Thuộc tính có thể Null
    this.date = date;
    this.day = day;
    this.fixedPrice = fixedPrice;

    // Thuộc tính Not Null
    this.startTime = startTime;
    this.endTime = endTime;
    this.currentPrice = currentPrice;
  }
}

export default Price;
