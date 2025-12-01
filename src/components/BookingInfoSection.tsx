import { Calendar } from 'lucide-react';
import '../models/booking'
import type Booking from '../models/booking';
import '../utils/GetGroundById'
import GetGroundById from '../utils/GetGroundById';
import '../assets/styles/BookingInfoSection.css';
function BookingInfoSection({booking,setShowBookingInfo, showBookingInfo }:{booking:Booking, setShowBookingInfo: (show: boolean) => void, showBookingInfo: boolean}) {
    const  ground = GetGroundById(booking?.groundId || '')[0];
    return (
        <div className="info-card">
                  <button 
                    className="info-card-header"
                    onClick={() => setShowBookingInfo(!showBookingInfo)}
                  >
                    <div className="info-card-header-left">
                      <Calendar size={20} />
                      <span>Thông tin lịch đặt</span>
                    </div>
                    <span className={`toggle-icon ${showBookingInfo ? 'open' : ''}`}>▼</span>
                  </button>
                  
                  {showBookingInfo && (
                    <div className="info-card-body">
                      <div className="info-row">
                        <span className="info-label">Ngày:</span>
                        {/* <span className="info-value">{category. || '30/11/2025'}</span> */}
                      </div>
                      <div className="booking-details">
                        <span className="booking-court">{ground.name}: {booking.startTime} - {booking.endTime}</span>
                        <span className="booking-price">160.000 đ</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Đối tượng:</span>
                        <span className="info-value">{ground.name}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Tổng giờ:</span>
                        <span className="info-value">{booking.amountTime * 60}p</span>
                      </div>
                      <div className="info-row total-row">
                        <span className="info-label">Tổng tiền:</span>
                        <span className="info-value total-price">160.000 đ</span>
                      </div>
                    </div>
                  )}
                </div>
    )
}
export default BookingInfoSection;