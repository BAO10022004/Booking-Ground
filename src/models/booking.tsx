// Định nghĩa các trạng thái Booking (Enum)
type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

class Booking {
  bookingId!: string;

  userId!: string;

  /** (Nullable) Ngày đặt sân - null nếu là event booking */
  date?: Date | null;

  /** (Nullable) Giờ bắt đầu (sử dụng string cho Time) - null nếu là event booking */
  startTime?: string | null;

  /** (Nullable) Giờ kết thúc (sử dụng string cho Time) - null nếu là event booking */
  endTime?: string | null;

  /** (Nullable) Tổng số giờ đặt sân (Int) - null nếu là event booking */
  amountTime?: number | null;

  /** (Not Null, Default=0) Loại đặt sân: True=1 (đặt sự kiện), False=0 (đặt bình thường) */
  isEvent!: boolean;

  /** (Nullable, Foreign Key) Tham chiếu Ground.GroundID (sân con cụ thể) - null nếu là event booking */
  groundId?: string | null;

  /** (Null) Đối tượng (VD: học sinh sinh viên) */
  target!: string | null;

  /** (Null) Ghi chú của khách hàng */
  customerNote!: string | null;

  /** (Null) Ghi chú của chủ sân */
  ownerNote!: string | null;

  /** (Not Null, Default=30) Số lượng người tham gia tối đa (với event thì là số vé) */
  quantity!: number;

  /** (Nullable) Tổng giá tiền thanh toán */
  totalPrice?: number | null;

  /** (Not Null) Trạng thái booking (VD: Pending, Confirmed, Cancelled, Completed) */
  status!: BookingStatus;

  /** (Null, Foreign Key) Tham chiếu Event.EventID (sự kiện cụ thể) */
  eventId!: string | null;
}

export default Booking;
