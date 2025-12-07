////////////////////////////////// imports lab//////////////////////////////////////
import { useState } from 'react';
import { ArrowLeft} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/BookingConfirmationPage.css';
////////////////////////////////// imports compunent//////////////////////////////////////
import AuthInfoSection from '../components/AuthInfoSection';
import BookingInfoSection from '../components/BookingInfoSection';
import VenueInfoSection from '../components/VenueInfoSection';
import PaymentInfoSection from '../components/PaymentInfoSection';
import CustomerInfoSection from '../components/CustomerInfoSection';
import TermsInfoSection from '../components/TermsInfoSection';
import PaymentMethodSection from '../components/PaymentMethodSection';
/////////////////////////////////// import function //////////////////////////////////////
import getBooking  from '../utils/getBooking';
import getVenues from '../utils/getVenues';
import GetGroundById from '../utils/GetGroundById';
import { GetAccount } from '../utils/get_account';
/////////////////////////////// import models //////////////////////////////////////
import type Venue from '../models/Venue';

export default function BookingConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const booking = getBooking.getBookingsById(bookingId || "")[0];
  const ground = GetGroundById(booking?.groundId || '')[0];
  const venue = getVenues().find(v => v.venueId === ground?.venueId) as Venue;
  const [showBookingInfo, setShowBookingInfo] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState('vnpay')
  const handleBack = () =>      navigate(-1);
  
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
        {/* Left Column - Form Sections */}
        <div className="left-column">
          <VenueInfoSection venue={venue} />
          
          <BookingInfoSection 
            booking={booking!} 
            showBookingInfo={showBookingInfo} 
            setShowBookingInfo={setShowBookingInfo} 
          />
          <AuthInfoSection 
            account={GetAccount()!} 
            isLogin={isLogin} 
            setIsLogin={setIsLogin} 
          />
          
          <CustomerInfoSection
            account={GetAccount()!}
            customerName={customerName}
            setCustomerName={setCustomerName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            notes={notes}
            setNotes={setNotes}
          />

          <TermsInfoSection />

          {/* Submit button cho mobile */}
          <div className="mobile-only">
            <button className="submit-btn" onClick={handleSubmit}>
              XÁC NHẬN & THANH TOÁN
            </button>
          </div>
        </div>

        {/* Right Column - Summary (Sticky on Desktop) */}
        <div className="right-column">
         
          
          <PaymentInfoSection />
          <PaymentMethodSection selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
          {/* Submit button cho desktop - sticky ở cuối right column */}
          <button className="submit-btn desktop-only" onClick={handleSubmit}>
            XÁC NHẬN & THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
}