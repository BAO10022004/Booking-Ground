import { useState, useEffect } from "react";
import { Info, ArrowRight } from "lucide-react";
import "../assets/styles/EventsBookingPage.css";
import { useNavigate, useParams } from "react-router-dom";
import HeaderEventBooking from "../components/EventBooking/HeaderEventBoking";
import DatePicker from "../components/EventBooking/DatePicker";
import { useEvents } from "../hooks";
import { eventService } from "../services";
import { useVenues } from "../hooks";

const EventsBookingPage = () => {
  const { venueId } = useParams<{ venueId?: string }>();
  const navigate = useNavigate();
  const { venues } = useVenues();
  const [selectedVenueId, setSelectedVenueId] = useState<string | undefined>(
    venueId
  );
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Load events với filter theo venueId
  const { events: apiEvents, loading } = useEvents(
    selectedVenueId ? { venue_id: selectedVenueId } : undefined
  );

  // Update selectedVenueId khi venueId từ URL thay đổi
  useEffect(() => {
    if (venueId) {
      setSelectedVenueId(venueId);
    }
  }, [venueId]);

  // Transform API events to display format - chỉ hiển thị events của venue đã chọn
  const events = apiEvents
    .filter((e) => !selectedVenueId || e.venue_id === selectedVenueId)
    .map((e) => ({
      id: e.id,
      venue_id: e.venue_id,
      title: e.name,
      time: "N/A", // Event model doesn't have start_time/end_time
      sport: "Sport", // TODO: Lấy từ venue/ground
      level: e.level || "N/A",
      participants: 0, // TODO: Lấy từ API nếu có
      maxParticipants: e.ticket_number || 0,
      price: `${e.price}k/Vé`,
      date: new Date().toLocaleDateString("vi-VN"), // Event model doesn't have date, use current date as placeholder
      avatars: [], // TODO: Lấy từ API nếu có
    }));
  const formatDateRange = (start: Date, end: Date) => {
    return `${start.toLocaleDateString("vi-VN")} - ${end.toLocaleDateString(
      "vi-VN"
    )}`;
  };

  const handleDateSelect = (start: Date, end: Date) => {
    setSelectedDateRange(formatDateRange(start, end));
    setShowDatePicker(false);
  };
  const handleEventClick = async (eventId: string, venueId?: string) => {
    if (!venueId) {
      alert("Không tìm thấy thông tin sân cho sự kiện này.");
      return;
    }

    try {
      // Lấy thông tin event đầy đủ
      const event = await eventService.getEventById(eventId);

      // Tạo tempBookingData với thông tin event
      const tempBookingData = {
        date: null, // Event booking không cần date
        start_time: null, // Event booking không cần start_time
        end_time: null, // Event booking không cần end_time
        ground_id: null, // Event booking không cần ground_id
        is_event: true,
        event_id: event.id,
        quantity: 1,
        target: undefined,
        venueId: venueId,
        totalPrice: event.price, // Giá vé event
        total_price: event.price, // Thêm total_price cho API
        totalHours: 0, // Event không tính theo giờ
        event: {
          id: event.id,
          name: event.name,
          price: event.price,
          ticket_number: event.ticket_number,
          level: event.level,
          start_date: event.start_date,
          end_date: event.end_date,
        },
      };

      // Lưu vào localStorage
      localStorage.setItem("tempBookingData", JSON.stringify(tempBookingData));

      // Navigate thẳng đến booking confirmation
      navigate("/booking-confirmation");
    } catch (error) {
      console.error("Error fetching event:", error);
      alert("Không thể tải thông tin sự kiện. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="events-booking-page">
        <div style={{ padding: "40px", textAlign: "center" }}>
          Đang tải sự kiện...
        </div>
      </div>
    );
  }

  const handleVenueChange = (newVenueId: string | undefined) => {
    setSelectedVenueId(newVenueId);
    // Update URL nếu có venueId
    if (newVenueId) {
      navigate(`/event/${newVenueId}`, { replace: true });
    } else {
      navigate(`/event`, { replace: true });
    }
  };

  return (
    <div className="events-booking-page">
      {/*Header */}
      <HeaderEventBooking
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        setShowDatePicker={setShowDatePicker}
      />

      {/* Venue Selection */}
      {venues.length > 0 && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            marginBottom: "16px",
          }}
        >
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}
          >
            Chọn sân:
          </label>
          <select
            value={selectedVenueId || ""}
            onChange={(e) => handleVenueChange(e.target.value || undefined)}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          >
            <option value="">Tất cả sân</option>
            {venues.map((venue) => {
              const venueIdValue = (venue as any).venueId || (venue as any).id;
              return (
                <option key={venueIdValue} value={venueIdValue}>
                  {venue.name}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {showDatePicker == true ? (
        <DatePicker
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      ) : (
        <></>
      )}

      {/* Events List */}
      <div className="events-list">
        {events.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <p>Chưa có sự kiện nào</p>
          </div>
        ) : (
          events.map((event) =>
            // Show all events if no date range selected, otherwise show all (since events don't have dates)
            (selectedDateRange == "" ? true : true) ? (
              <div key={event.id} className="event-card">
                {/* Event Header */}
                <div className="event-card-header">
                  <div className="event-header-left">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-time">
                      {event.time} | {event.sport}
                    </p>
                  </div>
                  <span className="event-date">{event.date}</span>
                </div>

                {/* Event Body */}
                <div className="event-card-body">
                  {/* Sport Level Badge */}
                  <div className="event-sport-badge">
                    <div className="sport-icon">🎾</div>
                    <div className="sport-info">
                      <span className="sport-name">Pickleball</span>
                      <span className="sport-level">{event.level}</span>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="event-participants">
                    <div className="participants-avatars">
                      {event.avatars.map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt={`Participant ${index + 1}`}
                          className="participant-avatar"
                        />
                      ))}
                    </div>
                    <span className="participants-count">
                      {event.participants}/{event.maxParticipants}
                    </span>
                  </div>

                  {/* Info Button */}
                  <button className="event-info-button">
                    <Info size={20} />
                  </button>
                </div>

                {/* Event Footer */}
                <div className="event-card-footer">
                  <div className="event-price-badge">{event.price}</div>
                  <button
                    className="event-join-button"
                    onClick={() => handleEventClick(event.id, event.venue_id)}
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )
          )
        )}
      </div>
    </div>
  );
};

export default EventsBookingPage;
