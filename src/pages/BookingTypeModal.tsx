import { X, ArrowRight } from "lucide-react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "../assets/styles/BookingTypeModal.css";
import { Venue } from "../models/Venue";
import { X, ArrowRight } from "lucide-react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "../assets/styles/BookingTypeModal.css";
import Venue from "../models/Venue";
import { useAuth } from "../hooks";

interface BookingTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue?: Venue | null;
}

export default function BookingTypeModal({
  isOpen,
  onClose,
  venue,
}: BookingTypeModalProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleDirectBooking = () => {
    if (!isAuthenticated) {
      navigate("/player/login");
      onClose();
      return;
    }
    if (!venue?.venueId) {
      return;
    }
    navigate(`/booking/${venue.venueId}`);
    onClose();
  };

  const handleEventBooking = () => {
    if (!isAuthenticated) {
      navigate("/player/login");
      onClose();
      return;
    }
    navigate(`/event/`);
    onClose();
  };

  const modalContent = (
    <div className="booking-modal-backdrop" onClick={onClose}>
      <div
        className="booking-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="booking-modal-close"
          aria-label="Đóng"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="booking-modal-header">
          <h2 className="booking-modal-title">Chọn hình thức đặt</h2>
        </div>

        {/* Options */}
        <div className="booking-modal-options">
          <div
            key={"truc-quan"}
            onClick={() => handleDirectBooking()}
            className="booking-option-card booking-option-direct"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleDirectBooking();
              }
            }}
          >
            <div className="booking-option-header">
              <h3 className="booking-option-title">Đặt lịch trực quan</h3>
              <ArrowRight className="booking-option-arrow" size={24} />
            </div>
            <p className="booking-option-description">
              Đặt lịch ngay khi khách chơi nhiều khung giờ, nhiều sân.
            </p>
          </div>
          <div
            key={"event"}
            onClick={handleEventBooking}
            className="booking-option-card booking-option-event"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleEventBooking();
              }
            }}
          >
            <span className="booking-option-badge">New</span>

            <div className="booking-option-header">
              <h3 className="booking-option-title">Đặt lịch sự kiện</h3>
              <ArrowRight className="booking-option-arrow" size={24} />
            </div>
            <p className="booking-option-description">
              Sự kiện giúp bạn chơi chung với người có cùng niềm đam mê, trình
              độ. Hay những giải đấu mang tính cạnh tranh cao, nâng cao trình độ
              do chủ sân tổ chức.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
