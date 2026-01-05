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
import Booking from "../models/booking";
import { calculateHours } from "../utils/helpers/calculateHelpers";

export default function BookingConfirmationPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { bookings, loading: bookingsLoading, createBooking } = useMyBookings();
  const existingBooking = bookingId
    ? bookings.find((b) => b.bookingId === bookingId) || null
    : null;
  const [tempBookingData, setTempBookingData] = useState<any>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [, setGround] = useState<any>(null);
  const [venueId, setVenueId] = useState<string | undefined>(undefined);
  const { venue, loading: venueLoading } = useVenue(venueId);
  const { user: account, loading: authLoading } = useAuth();
  const [showBookingInfo, setShowBookingInfo] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState("vnpay");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning" | "info";
    message: string;
  } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const loading =
    venueLoading || authLoading || (bookingId ? bookingsLoading : false);

  useEffect(() => {
    if (bookingId && existingBooking) {
      setBooking(existingBooking);
    } else {
      const tempDataStr = localStorage.getItem("tempBookingData");
      if (tempDataStr) {
        try {
          const tempData = JSON.parse(tempDataStr);
          setTempBookingData(tempData);
          setTotalPrice(tempData.totalPrice || 0);
          setTotalHours(tempData.totalHours || 0);
          setVenueId(tempData.venueId);

          const tempBooking = new Booking();
          tempBooking.date = new Date(tempData.date);
          tempBooking.startTime = tempData.start_time;
          tempBooking.endTime = tempData.end_time;
          tempBooking.groundId = tempData.ground_id;
          tempBooking.target = tempData.target || null;

          const calculatedHours =
            tempData.totalHours ||
            calculateHours(tempData.start_time, tempData.end_time);
          tempBooking.amountTime = calculatedHours;

          tempBooking.isEvent = false;
          tempBooking.quantity = tempData.quantity || 1;
          tempBooking.status = "Pending";
          setBooking(tempBooking);

          if (!tempData.totalHours) {
            setTotalHours(calculatedHours);
          }
        } catch (error) {
          console.error("Error parsing temp booking data:", error);
          showToast("error", "Dữ liệu đặt sân không hợp lệ");
        }
      }
    }
  }, [bookingId, existingBooking]);

  useEffect(() => {
    const fetchGround = async () => {
      if (booking?.groundId) {
        const foundGround = await getGroundById(booking.groundId);
        setGround(foundGround);
        if (foundGround && !venueId) {
          setVenueId(foundGround.venueId);
        }
      }
    };

    if (booking) {
      fetchGround();
    }
  }, [booking, venueId]);

  const handleBack = () => navigate(-1);

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async () => {
    if (!customerName.trim()) {
      showToast("warning", "Vui lòng nhập tên của bạn");
      return;
    }
    if (!phoneNumber.trim()) {
      showToast("warning", "Vui lòng nhập số điện thoại");
      return;
    }

    if (bookingId && existingBooking) {
      showToast("info", "Chức năng thanh toán đang được phát triển");
      return;
    }

    if (!tempBookingData || !booking) {
      showToast("error", "Không tìm thấy thông tin đặt sân");
      return;
    }

    try {
      setIsCreating(true);
      const createdBooking = await createBooking({
        date: tempBookingData.date,
        start_time: tempBookingData.start_time,
        end_time: tempBookingData.end_time,
        ground_id: tempBookingData.ground_id,
        is_event: false,
        quantity: tempBookingData.quantity || 1,
        target: tempBookingData.target || undefined,
        customer_note: notes.trim() || undefined,
      });

      localStorage.removeItem("tempBookingData");
      showToast("success", "Đặt sân thành công!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      showToast(
        "error",
        error?.message || "Đặt sân thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !account) {
      navigate("/player/login");
    }
  }, [account, authLoading, navigate]);

  useEffect(() => {
    if (account) {
      setCustomerName(account.fullName || "");
      setPhoneNumber(account.phoneNumber || "");
    }
  }, [account]);

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
    if (loading) {
      return (
        <div className="booking-confirmation-page">
          <div style={{ padding: "40px", textAlign: "center" }}>
            Đang tải...
          </div>
        </div>
      );
    }
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
          <BookingInfoSection
            booking={booking!}
            showBookingInfo={showBookingInfo}
            setShowBookingInfo={setShowBookingInfo}
            totalPrice={totalPrice}
            totalHours={totalHours}
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
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={isCreating}
            >
              {isCreating ? "Đang xử lý..." : "XÁC NHẬN & THANH TOÁN"}
            </button>
          </div>
        </div>

        {/* Right Column - Summary (Sticky on Desktop) */}
        <div className="right-column">
          <PaymentInfoSection
            totalAmount={
              totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")} ₫` : "0 ₫"
            }
          />
          <PaymentMethodSection
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
          {/* Submit button cho desktop - sticky ở cuối right column */}
          <button
            className="submit-btn desktop-only"
            onClick={handleSubmit}
            disabled={isCreating}
          >
            {isCreating ? "Đang xử lý..." : "XÁC NHẬN & THANH TOÁN"}
          </button>
        </div>
      </div>
    </div>
  );
}
