import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingEventPage from "./BookingEventPage";

function BookingPage() {
  const navigate = useNavigate();
  const { venueId } = useParams<{
    venueId: string;
  }>();

  useEffect(() => {
    if (!venueId) {
      navigate("/");
    }
  }, [venueId, navigate]);

  // Show loading nếu không có params
  if (!venueId) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        <div>Đang tải...</div>
      </div>
    );
  }
  return <BookingEventPage venueId={venueId} />;
}

export default BookingPage;
