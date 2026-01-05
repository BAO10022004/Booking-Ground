import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/styles/BookingConfirmationPage.css";
import AuthInfoSection from "../components/AuthInfoSection";
import BookingInfoSection from "../components/BookingInfoSection";
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

          // Set venueId - có thể từ tempData.venueId hoặc từ ground sau này
          if (tempData.venueId) {
            setVenueId(tempData.venueId);
          }

          const tempBooking = new Booking();
          let calculatedHours = 0;

          // Chỉ set date, startTime, endTime, groundId nếu không phải event booking
          if (!tempData.is_event) {
            if (tempData.date) {
              tempBooking.date = new Date(tempData.date);
            }
            tempBooking.startTime = tempData.start_time || "";
            tempBooking.endTime = tempData.end_time || "";
            tempBooking.groundId = tempData.ground_id || "";

            calculatedHours =
              tempData.totalHours ||
              (tempData.start_time && tempData.end_time
                ? calculateHours(tempData.start_time, tempData.end_time)
                : 0);
            tempBooking.amountTime = calculatedHours;
          } else {
            // Event booking: không có date, time, ground
            tempBooking.date = undefined as any;
            tempBooking.startTime = undefined as any;
            tempBooking.endTime = undefined as any;
            tempBooking.groundId = undefined as any;
            tempBooking.amountTime = 0;
          }

          tempBooking.isEvent = tempData.is_event || false;
          tempBooking.quantity = tempData.quantity || 1;
          tempBooking.status = "Pending";
          setBooking(tempBooking);

          if (!tempData.totalHours && !tempData.is_event) {
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
      // Chỉ fetch ground nếu là booking thường (có groundId)
      if (booking?.groundId && !booking.isEvent) {
        const foundGround = await getGroundById(booking.groundId);
        setGround(foundGround);
        if (foundGround && !venueId) {
          setVenueId(foundGround.venueId);
        }
      }
      // Nếu là event booking và chưa có venueId, lấy từ tempBookingData
      else if (booking?.isEvent && !venueId && tempBookingData?.venueId) {
        setVenueId(tempBookingData.venueId);
      }
    };

    if (booking) {
      fetchGround();
    }
  }, [booking, venueId, tempBookingData]);

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

      // Chuẩn bị dữ liệu booking
      const bookingData: any = {
        is_event: tempBookingData.is_event || false,
        event_id: tempBookingData.event_id || null,
        quantity: tempBookingData.quantity || 1,
        target: tempBookingData.target || null,
        customer_note: notes.trim() || null,
        total_price:
          tempBookingData.totalPrice || tempBookingData.total_price || 0,
      };

      // Chỉ thêm date, start_time, end_time, ground_id nếu không phải event booking
      if (!tempBookingData.is_event) {
        bookingData.date = tempBookingData.date || null;
        bookingData.start_time = tempBookingData.start_time || null;
        bookingData.end_time = tempBookingData.end_time || null;
        bookingData.ground_id = tempBookingData.ground_id || null;
      }
      // Event booking: không gửi date, start_time, end_time, ground_id
      // Backend sẽ tự set null cho các field này

      await createBooking(bookingData);

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

  // Với event booking, không cần venue (hoặc có thể hiển thị mà không cần venue)
  // Với booking thường, cần có venue
  if (!booking) {
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

  // Với booking thường, cần có venue. Với event booking, venue là optional
  if (!booking.isEvent && !venue) {
    if (loading) {
      return (
        <div className="booking-confirmation-page">
          <div style={{ padding: "40px", textAlign: "center" }}>
            Đang tải thông tin sân...
          </div>
        </div>
      );
    }
    return (
      <div className="booking-confirmation-page">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Không tìm thấy thông tin sân
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
            event={tempBookingData?.event}
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

          {/* <TermsInfoSection /> */}

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
          {/* <PaymentInfoSection
            totalAmount={
              totalPrice > 0 ? `${totalPrice.toLocaleString("vi-VN")} ₫` : "0 ₫"
            }
          /> */}
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
