import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  AlertCircle,
} from "lucide-react";
import "../../assets/styles/BookingsPage.css";
import { useMyBookings } from "../../hooks";

const BookingsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { rawBookings, loading, error } = useMyBookings();

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>Đang tải...</div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Có lỗi xảy ra khi tải dữ liệu</p>
      </div>
    );
  }

  const bookings = (rawBookings || []).map((b) => {
    let dateStr = "";
    try {
      if (b.date) {
        const date = b.date instanceof Date ? b.date : new Date(b.date);
        dateStr = date.toISOString().split("T")[0];
      }
    } catch (e) {
      console.error("Error parsing date:", e);
      dateStr = new Date().toISOString().split("T")[0];
    }

    return {
      BookingID: b.bookingId || "",
      UserID: b.userId || "",
      Date: dateStr,
      StartTime: b.startTime || "",
      EndTime: b.endTime || "",
      AmountTime: b.amountTime || 0,
      IsEvent: b.is_event || false,
      GroundID: b.groundId || "",
      GroundName:
        (b.ground && typeof b.ground === "object" && "name" in b.ground
          ? b.ground.name
          : null) || "Sân bóng",
      Target: b.target || "",
      CustomerNote: b.customer_note || "",
      OwnerNote: b.owner_note || "",
      Quantity: b.quantity || 1,
      Status: b.status || "Pending",
    };
  });

  const statusConfig = {
    Pending: { label: "Chờ xác nhận", color: "warning", icon: "⏳" },
    Confirmed: { label: "Đã xác nhận", color: "success", icon: "✓" },
    Completed: { label: "Hoàn thành", color: "completed", icon: "✓" },
    Cancelled: { label: "Đã hủy", color: "danger", icon: "✕" },
  };

  const filters = [
    { id: "all", label: "Tất cả", count: bookings.length },
    {
      id: "Pending",
      label: "Chờ xác nhận",
      count: bookings.filter((b) => b.Status === "Pending").length,
    },
    {
      id: "Confirmed",
      label: "Đã xác nhận",
      count: bookings.filter((b) => b.Status === "Confirmed").length,
    },
    {
      id: "Completed",
      label: "Hoàn thành",
      count: bookings.filter((b) => b.Status === "Completed").length,
    },
    {
      id: "Cancelled",
      label: "Đã hủy",
      count: bookings.filter((b) => b.Status === "Cancelled").length,
    },
  ];

  const filteredBookings =
    selectedFilter === "all"
      ? bookings
      : bookings.filter((b) => b.Status === selectedFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bookings-page-content">
      {/* Header */}
      <div className="bookings-header-section">
        <div>
          <h1 className="bookings-content-title">Sân đã đặt</h1>
          <p className="bookings-content-subtitle">
            Quản lý tất cả các lượt đặt sân của bạn
          </p>
        </div>
        <div className="bookings-stats">
          <div className="booking-stat-item">
            <span className="stat-number">{bookings.length}</span>
            <span className="stat-text">Tổng đặt sân</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bookings-filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-button ${
              selectedFilter === filter.id ? "active" : ""
            }`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.label}
            <span className="filter-count">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="empty-bookings">
            <div className="empty-icon">📅</div>
            <h3 className="empty-title">Chưa có đặt sân nào</h3>
            <p className="empty-text">
              {selectedFilter === "all"
                ? "Bạn chưa có lượt đặt sân nào. Hãy đặt sân ngay!"
                : `Không có đặt sân nào ở trạng thái "${
                    filters.find((f) => f.id === selectedFilter)?.label
                  }"`}
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => {
            const status =
              statusConfig[booking.Status as keyof typeof statusConfig];
            return (
              <div key={booking.BookingID} className="booking-card">
                {/* Card Header */}
                <div className="booking-card-header">
                  <div className="booking-header-left">
                    <h3 className="booking-ground-name">
                      {booking.GroundName}
                    </h3>
                    {booking.IsEvent && (
                      <span className="event-badge">🎉 Sự kiện</span>
                    )}
                  </div>
                  <span className={`booking-status status-${status.color}`}>
                    <span className="status-icon">{status.icon}</span>
                    {status.label}
                  </span>
                </div>

                {/* Card Body */}
                <div className="booking-card-body">
                  <div className="booking-info-grid">
                    {/* Date */}
                    <div className="booking-info-item">
                      <div className="info-icon-wrapper info-icon-blue">
                        <Calendar size={18} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Ngày đặt</span>
                        <span className="info-value">
                          {formatDate(booking.Date)}
                        </span>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="booking-info-item">
                      <div className="info-icon-wrapper info-icon-green">
                        <Clock size={18} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Thời gian</span>
                        <span className="info-value">
                          {booking.StartTime} - {booking.EndTime} (
                          {booking.AmountTime}h)
                        </span>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="booking-info-item">
                      <div className="info-icon-wrapper info-icon-purple">
                        <Users size={18} />
                      </div>
                      <div className="info-content">
                        <span className="info-label">Số lượng sân</span>
                        <span className="info-value">
                          {booking.Quantity} sân
                        </span>
                      </div>
                    </div>

                    {/* Target */}
                    {booking.Target && (
                      <div className="booking-info-item">
                        <div className="info-icon-wrapper info-icon-orange">
                          <MapPin size={18} />
                        </div>
                        <div className="info-content">
                          <span className="info-label">Mục đích</span>
                          <span className="info-value">{booking.Target}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {(booking.CustomerNote || booking.OwnerNote) && (
                    <div className="booking-notes">
                      {booking.CustomerNote && (
                        <div className="note-item note-customer">
                          <FileText size={16} />
                          <div>
                            <span className="note-label">Ghi chú của bạn:</span>
                            <span className="note-text">
                              {booking.CustomerNote}
                            </span>
                          </div>
                        </div>
                      )}
                      {booking.OwnerNote && (
                        <div className="note-item note-owner">
                          <AlertCircle size={16} />
                          <div>
                            <span className="note-label">
                              Ghi chú từ chủ sân:
                            </span>
                            <span className="note-text">
                              {booking.OwnerNote}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="booking-card-footer">
                  <button className="booking-action-btn btn-detail">
                    Xem chi tiết
                  </button>
                  {booking.Status === "Pending" && (
                    <button className="booking-action-btn btn-cancel">
                      Hủy đặt sân
                    </button>
                  )}
                  {booking.Status === "Confirmed" && (
                    <button className="booking-action-btn btn-modify">
                      Sửa đổi
                    </button>
                  )}
                  {booking.Status === "Completed" && (
                    <button className="booking-action-btn btn-review">
                      Đánh giá
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
