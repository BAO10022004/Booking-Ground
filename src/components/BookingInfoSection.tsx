import { Calendar, Ticket } from "lucide-react";
import { useState, useEffect } from "react";
import "../models/booking";
import type Booking from "../models/booking";
import { getGroundById } from "../utils/selectors";
import Ground from "../models/Ground";
import "../assets/styles/BookingInfoSection.css";

interface EventInfo {
  id: string;
  name: string;
  price: number;
  ticket_number: number;
  level?: string;
  start_date?: string | null;
  end_date?: string | null;
}

interface BookingInfoSectionProps {
  booking: Booking;
  setShowBookingInfo: (show: boolean) => void;
  showBookingInfo: boolean;
  totalPrice?: number;
  totalHours?: number;
  event?: EventInfo;
}

function BookingInfoSection({
  booking,
  setShowBookingInfo,
  showBookingInfo,
  totalPrice,
  totalHours,
  event,
}: BookingInfoSectionProps) {
  const [ground, setGround] = useState<Ground | null>(null);
  const isEvent = booking.isEvent || false;

  useEffect(() => {
    const fetchGround = async () => {
      if (booking?.groundId && !isEvent) {
        const foundGround = await getGroundById(booking.groundId);
        setGround(foundGround);
      }
    };
    fetchGround();
  }, [booking?.groundId, isEvent]);

  return (
    <div className="info-card">
      <button
        className="info-card-header"
        onClick={() => setShowBookingInfo(!showBookingInfo)}
      >
        <div className="info-card-header-left">
          {isEvent ? <Ticket size={20} /> : <Calendar size={20} />}
          <span>{isEvent ? "Thông tin sự kiện" : "Thông tin lịch đặt"}</span>
        </div>
        <span className={`toggle-icon ${showBookingInfo ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {showBookingInfo && (
        <div className="info-card-body">
          {isEvent && event ? (
            // Hiển thị thông tin sự kiện
            <>
              <div className="info-row">
                <span className="info-label">Tên sự kiện:</span>
                <span className="info-value">{event.name}</span>
              </div>
              {event.start_date && (
                <div className="info-row">
                  <span className="info-label">Thời gian bắt đầu:</span>
                  <span className="info-value">
                    {new Date(event.start_date).toLocaleString("vi-VN")}
                  </span>
                </div>
              )}
              {event.end_date && (
                <div className="info-row">
                  <span className="info-label">Thời gian kết thúc:</span>
                  <span className="info-value">
                    {new Date(event.end_date).toLocaleString("vi-VN")}
                  </span>
                </div>
              )}
              {event.level && (
                <div className="info-row">
                  <span className="info-label">Mức độ:</span>
                  <span className="info-value">{event.level}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Số vé:</span>
                <span className="info-value">{event.ticket_number} vé</span>
              </div>
              <div className="info-row total-row">
                <span className="info-label">Giá vé:</span>
                <span className="info-value total-price">
                  {event.price
                    ? `${event.price.toLocaleString("vi-VN")} ₫`
                    : "0 ₫"}
                </span>
              </div>
            </>
          ) : (
            // Hiển thị thông tin thuê sân theo giờ
            <>
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
                  {ground?.name || "N/A"}: {booking.startTime} -{" "}
                  {booking.endTime}
                </span>
                <span className="booking-price">
                  {totalPrice
                    ? `${totalPrice.toLocaleString("vi-VN")} ₫`
                    : "0 ₫"}
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
                    ? `${booking.amountTime}h${
                        booking.amountTime % 1 === 0.5 ? "30" : ""
                      }`
                    : "0h"}
                </span>
              </div>
              <div className="info-row total-row">
                <span className="info-label">Tổng tiền:</span>
                <span className="info-value total-price">
                  {totalPrice
                    ? `${totalPrice.toLocaleString("vi-VN")} ₫`
                    : "0 ₫"}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default BookingInfoSection;
