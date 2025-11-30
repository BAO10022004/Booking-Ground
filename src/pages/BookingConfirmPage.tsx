import { useState } from 'react';
import { ArrowLeft, Calendar} from 'lucide-react';
import '../assets/styles/BookingConfirmationPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import getBooking  from '../utils/getBooking';
import getVenues from '../utils/getVenues';
import GetGroundById from '../utils/GetGroundById';

import VenueInfoSection from '../components/VenueInfoSection';
import type Venue from '../models/Venue';
import { GetAccount } from '../utils/get_account';
export default function BookingConfirmationPage() {
  const { bookingId } = useParams<{
    bookingId: string;
  }>();
  console.log('📍 Booking ID from params:');
  const navigate = useNavigate();
  const booking =getBooking.getBookingsById(bookingId || "")[0];


  const selectedDate = booking?.date;
  const ground = GetGroundById(booking?.groundId || '')[0];
  const venue = getVenues().find(v => v.venueId === ground?.venueId) as Venue;
  const [showBookingInfo, setShowBookingInfo] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!customerName.trim()) {
      alert('Vui lòng nhập tên của bạn');
      return;
    }
    if (!phoneNumber.trim()) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }
    
  };
  console.log('📍 Booking Details:', { booking, venue, ground });
  return (
    <div className="booking-confirmation-page">
      {/* Header */}
      <header className="booking-header">
              <div className="booking-header-container">
                <div className="booking-header-left">
                  <button className="booking-back-btn" onClick={handleBack}>
                    <ArrowLeft size={24} />
                  </button>
                  <h1 className="booking-header-title">Đặt lịch ngay trực quan</h1>
                </div>
              </div>
            </header>
      <div className="confirmation-content">
        {/* Venue Info Section */}
        <VenueInfoSection venue={venue} />
        {/* Booking Info Section */}
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

        {/* Auth Tabs */}
          {GetAccount() ? null : (
            <div className="auth-section">
              <p className="auth-subtitle">Đăng nhập để có thể sử dụng ưu đãi</p>
              <div className="auth-tabs">
                <button 
                  className={`auth-tab ${isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(true)}
                >
                  ĐĂNG NHẬP
                </button>
                <button 
                  className={`auth-tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(false)}
                >
                  ĐĂNG KÝ
                </button>
              </div>
            </div>
          )}
        {/* Payment Info */}
        <div className="payment-info">
          <div className="payment-row">
            <span>Số tiền cần thanh toán</span>
            <span className="payment-amount">160.000 đ</span>
          </div>
          <button className="add-service-btn">Thêm dịch vụ</button>
        </div>

        {/* Customer Form */}
        <div className="form-section">
          <div className="form-group">
            <label className="form-label">TÊN CỦA BẠN</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder={GetAccount() ? GetAccount()?.fullName : "Nhập tên của bạn"} 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{GetAccount() ? GetAccount()?.phoneNumber : "Nhập số điện thoại của bạn"} </label>
            <div className="phone-input-wrapper">
              <span className="country-code">+ 84</span>
              <input 
                type="tel" 
                className="form-input phone-input" 
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">GHI CHÚ CHO CHỦ SÂN</label>
            <textarea 
              className="form-textarea" 
              placeholder="Nhập ghi chú"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Notice */}
        <div className="notice-section">
          <div className="notice-title">Lưu ý:</div>
          <ul className="notice-list">
            <li>Việc thanh toán được thực hiện trực tiếp giữa bạn và chủ sân.</li>
            <li>ALOBO đóng vai trò kết nối, hỗ trợ bạn tìm và đặt sân dễ dàng hơn.</li>
            <li>Mỗi sân có thể có quy định và chính sách riêng, hãy dành chút thời gian đọc kỹ để đảm bảo quyền lợi cho bạn nhé!</li>
          </ul>
        </div>

        {/* Terms */}
        <div className="terms-section">
          Bằng việc bấm Xác nhận và Thanh toán, bạn xác nhận đã đọc và đồng ý với{' '}
          <a href="#" className="terms-link">Điều khoản đặt sân</a>
          {' và '}
          <a href="#" className="terms-link">Chính sách hoàn tiền và hủy lịch</a>.
        </div>

        {/* Submit Button */}
        <button className="submit-btn" onClick={handleSubmit}>
          XÁC NHẬN & THANH TOÁN
        </button>

        <div className="bottom-spacing"></div>
      </div>
    </div>
  );
}