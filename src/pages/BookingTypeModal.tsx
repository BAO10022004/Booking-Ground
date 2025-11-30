import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import ReactDOM from 'react-dom';
import '../assets/styles/BookingTypeModal.css';
import { useNavigate } from 'react-router-dom';

interface BookingTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingTypeModal({ isOpen, onClose }: BookingTypeModalProps) {
  if (!isOpen) return null;
    const navigate = useNavigate();
  const handleDirectBooking = () => {
    console.log('Đặt lịch ngay trực quan');
    navigate('/booking');
    onClose();
  };

  const handleEventBooking = () => {
    console.log('Đặt lịch sự kiện');
    onClose();
  };

  const modalContent = (
    <div 
      className="booking-modal-backdrop"
      onClick={onClose}
    >
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
          <h2 className="booking-modal-title">
            Chọn hình thức đặt
          </h2>
        </div>

        {/* Options */}
        <div className="booking-modal-options">
          {/* Đặt lịch ngay trực quan */}
          <div 
            onClick={handleDirectBooking}
            className="booking-option-card booking-option-direct"
          >
            <div className="booking-option-header">
              <h3 className="booking-option-title">
                Đặt lịch ngay trực quan
              </h3>
              <ArrowRight className="booking-option-arrow" size={24} />
            </div>
            <p className="booking-option-description">
              Đặt lịch ngay khi khách chơi nhiều khung giờ, nhiều sân.
            </p>
          </div>

          {/* Đặt lịch sự kiện */}
          <div 
            onClick={handleEventBooking}
            className="booking-option-card booking-option-event"
          >
            {/* New Badge */}
            <span className="booking-option-badge">
              New
            </span>
            
            <div className="booking-option-header">
              <h3 className="booking-option-title">
                Đặt lịch sự kiện
              </h3>
              <ArrowRight className="booking-option-arrow" size={24} />
            </div>
            <p className="booking-option-description">
              Sự kiện giúp bạn chơi chung với người có cùng niềm đam mê, trình độ. Hay những giải đấu mang tính cạnh tranh cao, nâng cao trình độ do chủ sân tổ chức.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal vào body để tránh bị ảnh hưởng bởi CSS của parent
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
}