import React, { useState } from "react";
import { ArrowLeft, Calendar, Info, ArrowRight, Users } from "lucide-react";
import "../assets/styles/EventsBookingPage.css";
import { useNavigate } from "react-router-dom";
import HeaderEventBooking from "../components/EventBooking/HeaderEventBoking";
import DatePicker from "../components/EventBooking/DatePicker";
import { useEvents } from "../hooks";
const isDateInRangeIgnoreTime = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  const resetTime = (d: Date) => {
    const newDate = new Date(d);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const checkDate = resetTime(date);
  const start = resetTime(startDate);
  const end = resetTime(endDate);

  return checkDate >= start && checkDate <= end;
};
const EventsBookingPage = () => {
  const { events: apiEvents, loading } = useEvents();
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Transform API events to display format
  const events = apiEvents.map((e) => ({
    id: e.id,
    title: e.name,
    time:
      e.start_time && e.end_time ? `${e.start_time} - ${e.end_time}` : "N/A",
    sport: "Sport", // TODO: Lấy từ venue/ground
    level: e.level || "N/A",
    participants: 0, // TODO: Lấy từ API nếu có
    maxParticipants: e.ticket_number || 0,
    price: `${e.price}k/Vé`,
    date: e.date || new Date().toLocaleDateString("vi-VN"),
    avatars: [], // TODO: Lấy từ API nếu có
  }));
  const formatDateRange = (start: Date, end: Date) => {
    setStart(start.toLocaleDateString("vi-VN"));
    setEnd(end.toLocaleDateString("vi-VN"));
    return `${start.toLocaleDateString("vi-VN")} - ${end.toLocaleDateString(
      "vi-VN"
    )}`;
  };

  const handleDateSelect = (start: Date, end: Date) => {
    setSelectedDateRange(formatDateRange(start, end));
    setShowDatePicker(false);
  };
  const handleEventClick = (eventId: string) => {
    // TODO: Navigate to event details page
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

  return (
    <div className="events-booking-page">
      {/*Header */}
      <HeaderEventBooking
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        setShowDatePicker={setShowDatePicker}
      />

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
            (selectedDateRange == ""
              ? true
              : isDateInRangeIgnoreTime(
                  new Date(event.date),
                  new Date(start),
                  new Date(end)
                ) == true) == true ? (
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
                    onClick={() => handleEventClick(event.id)}
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
