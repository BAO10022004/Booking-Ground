import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/BookingConfirmationPage.css";
import AuthInfoSection from "../components/AuthInfoSection";
import BookingInfoSection from "../components/BookingInfoSection";
import VenueInfoSection from "../components/VenueInfoSection";
import PaymentInfoSection from "../components/PaymentInfoSection";
import CustomerInfoSection from "../components/CustomerInfoSection";
import TermsInfoSection from "../components/TermsInfoSection";
import PaymentMethodSection from "../components/PaymentMethodSection";
import Toast from "../components/Toast";
import { useVenue, useAuth, useMyBookings } from "../hooks";
import { getGroundById } from "../utils/selectors";

export default function BookingConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { bookings, loading: bookingsLoading } = useMyBookings();
  const booking = bookings.find((b) => b.bookingId === bookingId) || null;
  const [ground, setGround] = useState<any>(null);
  const [venueId, setVenueId] = useState<string | undefined>(undefined);
  const { venue, loading: venueLoading } = useVenue(venueId);
  const { user: account, loading: authLoading } = useAuth();
  const [showBookingInfo, setShowBookingInfo] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState("vnpay");
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning" | "info";
    message: string;
  } | null>(null);
  const loading = venueLoading || authLoading || bookingsLoading;

  useEffect(() => {
    const fetchGround = async () => {
      if (booking?.groundId) {
        const foundGround = await getGroundById(booking.groundId);
        setGround(foundGround);
        if (foundGround) {
          setVenueId(foundGround.venueId);
        }
      }
    };

    if (booking) {
      fetchGround();
    }
  }, [booking]);

  const handleBack = () => navigate(-1);

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = () => {
    if (!customerName.trim()) {
      showToast("warning", "Vui lòng nhập tên của bạn");
      return;
    }
    if (!phoneNumber.trim()) {
      showToast("warning", "Vui lòng nhập số điện thoại");
      return;
    }
    // TODO: Implement payment processing
    showToast("info", "Chức năng thanh toán đang được phát triển");
  };

  useEffect(() => {
    if (!authLoading && !account) {
      navigate("/player/login");
    }
  }, [account, authLoading, navigate]);

  if (loading) {
    return (
      <div className="booking-confirmation-page">
        <div style={{ padding: "40px", textAlign: "center" }}>Đang tải...</div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="booking-confirmation-page">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Vui lòng đăng nhập để xem xác nhận đặt sân
        </div>
      </div>
    );
  }

  if (!venue || !booking) {
    return (
      <div className="booking-confirmation-page">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Không tìm thấy thông tin đặt sân
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="booking-confirmation-page">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
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
        <div className="left-column">
          <VenueInfoSection venue={venue} />

          <BookingInfoSection
            booking={booking!}
            showBookingInfo={showBookingInfo}
            setShowBookingInfo={setShowBookingInfo}
          />
          <AuthInfoSection
            account={account}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />

          <CustomerInfoSection
            account={account}
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
          <PaymentMethodSection
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
          {/* Submit button cho desktop - sticky ở cuối right column */}
          <button className="submit-btn desktop-only" onClick={handleSubmit}>
            XÁC NHẬN & THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
}
