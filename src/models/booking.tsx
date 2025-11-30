// Định nghĩa các trạng thái Booking (Enum)
type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

class Booking {  
bookingId!: string; 

  userId!: string; 

  /** (Not Null) Ngày đặt sân */
  date!: Date; 

  /** (Not Null) Giờ bắt đầu (sử dụng string cho Time) */
  startTime!: string; 

  /** (Not Null) Giờ kết thúc (sử dụng string cho Time) */
  endTime!: string; 

  /** (Not Null) Tổng số giờ đặt sân (Int) */
  amountTime!: number; 

  /** (Not Null, Default=0) Loại đặt sân: True=1 (đặt sự kiện), False=0 (đặt bình thường) */
  isEvent!: boolean; 

  /** (Not Null, Foreign Key) Tham chiếu Ground.GroundID (sân con cụ thể) */
  groundId!: string; 

  /** (Null) Đối tượng (VD: học sinh sinh viên) */
  target!: string | null; 

  /** (Null) Ghi chú của khách hàng */
  customerNote!: string | null; 

  /** (Null) Ghi chú của chủ sân */
  ownerNote!: string | null; 

  /** (Not Null, Default=30) Số lượng người tham gia tối đa (với event thì là số vé) */
  quantity!: number; 

  /** (Not Null) Trạng thái booking (VD: Pending, Confirmed, Cancelled, Completed) */
  status!: BookingStatus; 

  /** (Null, Foreign Key) Tham chiếu Event.EventID (sự kiện cụ thể) */
  eventId!: string | null; 

 
}

export default Booking;