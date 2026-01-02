import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmPage";
import LoginPage from "./pages/LoginPage";
import EventsBookingPage from "./pages/EventsBookingPage";
import ServiceSelectionPage from "./pages/ServiceSelectionPage";
import FieldOwnerLoginPage from "./pages/FieldOwnerLoginPage";
import PlayerLoginPage from "./pages/PlayerLoginPage";
import PlayerRegisterPage from "./pages/PlayerRegisterPage";
import FieldOwnerPortal from "./pages/FieldOwnerPortal";
function App() {
  return (
    <BrowserRouter basename="/Booking-Ground">
      <Routes>
        {/* Landing Page - Initial page with Login or Guest options */}
        <Route path="/" element={<FieldOwnerLoginPage />} />
        {/* <Route path="/" element={<PlayerLoginPage />} /> */}

        {/* Field Owner Portal */}
        {/* <Route path="/portal" element={<FieldOwnerPortal />} /> */}

        {/* Player Login/Register Pages */}
        <Route path="/player/login" element={<PlayerLoginPage />} />
        <Route path="/player/register" element={<PlayerRegisterPage />} />

        {/* Guest/Player Home Page - Booking interface */}
        <Route path="/home" element={<HomePage />} />

        {/* Booking Page - ✅ SỬA: Thêm URL params :venueId/:categoryId */}
        <Route path="/booking/:venueId" element={<BookingPage />} />

        {/* Booking Confirmation Page */}
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmationPage />}
        />
        <Route path="/login/:isLoginAgument" element={<LoginPage />} />
        <Route path="/event/" element={<EventsBookingPage />} />
        <Route path="/services" element={<ServiceSelectionPage />} />
        {/* 404 - Not Found (Optional) */}
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: "16px",
              }}
            >
              <h1>404 - Không tìm thấy trang</h1>
              <a href="/" style={{ color: "#1890ff" }}>
                Về trang chủ
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
