import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import "../models/booking";
import type Booking from "../models/booking";
import { getGroundById } from "../utils/selectors";
import Ground from "../models/Ground";
import "../assets/styles/BookingInfoSection.css";
function BookingInfoSection({
  booking,
  setShowBookingInfo,
  showBookingInfo,
  totalPrice,
  totalHours,
}: {
  booking: Booking;
  setShowBookingInfo: (show: boolean) => void;
  showBookingInfo: boolean;
  totalPrice?: number;
  totalHours?: number;
}) {
  const [ground, setGround] = useState<Ground | null>(null);

  useEffect(() => {
    const fetchGround = async () => {
      if (booking?.groundId) {
        const foundGround = await getGroundById(booking.groundId);
        setGround(foundGround);
      }
    };
    fetchGround();
  }, [booking?.groundId]);
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
        <span className={`toggle-icon ${showBookingInfo ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {showBookingInfo && (
        <div className="info-card-body">
          <div className="info-row">
            <span className="info-label">Ngày:</span>
            <span className="info-value">
              {booking.date
                ? new Date(booking.date).toLocaleDateString("vi-VN")
                : "N/A"}
            </span>
          </div>
          <div className="booking-details">
            <span className="booking-court">
              {ground?.name || "N/A"}: {booking.startTime} - {booking.endTime}
            </span>
            <span className="booking-price">
              {totalPrice ? `${totalPrice.toLocaleString("vi-VN")} ₫` : "0 ₫"}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Đối tượng:</span>
            <span className="info-value">{booking.target || "N/A"}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Tổng giờ:</span>
            <span className="info-value">
              {totalHours !== undefined 
                ? `${totalHours}h${totalHours % 1 === 0.5 ? "30" : ""}`
                : booking.amountTime 
                  ? `${booking.amountTime}h${booking.amountTime % 1 === 0.5 ? "30" : ""}`
                  : "0h"}
            </span>
          </div>
          <div className="info-row total-row">
            <span className="info-label">Tổng tiền:</span>
            <span className="info-value total-price">
              {totalPrice ? `${totalPrice.toLocaleString("vi-VN")} ₫` : "0 ₫"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
export default BookingInfoSection;
