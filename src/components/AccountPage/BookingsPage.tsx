import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  AlertCircle,
  Edit,
  Trash2,
  X,
  Star,
} from "lucide-react";
import "../../assets/styles/BookingsPage.css";
import { useMyBookings } from "../../hooks";
import { ratingService } from "../../services";

const BookingsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [showRatingModal, setShowRatingModal] = useState<string | null>(null);
  const [ratingStars, setRatingStars] = useState(0);
  const [ratingReview, setRatingReview] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const {
    rawBookings,
    loading,
    error,
    updateBooking,
    deleteBooking,
    refreshBookings,
  } = useMyBookings();

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

  const bookings = (rawBookings || []).map((b, index) => {
    let dateStr = "";
    try {
      if (b.date) {
        const date =
          typeof b.date === "string" ? new Date(b.date) : new Date(b.date);
        dateStr = date.toISOString().split("T")[0];
      }
    } catch (e) {
      dateStr = new Date().toISOString().split("T")[0];
    }

    return {
      BookingID: b.id || `booking-${index}`,
      UserID: b.user_id || "",
      Date: dateStr,
      StartTime: b.start_time || "",
      EndTime: b.end_time || "",
      AmountTime: b.amount_time || 0,
      IsEvent: b.is_event || false,
      GroundID: b.ground_id || "",
      GroundName:
        (b.ground && typeof b.ground === "object" && "name" in b.ground
          ? b.ground.name
          : null) || (b.is_event ? "Sự kiện" : "Sân bóng"),
      VenueId:
        (b.ground && typeof b.ground === "object" && "venue_id" in b.ground
          ? b.ground.venue_id
          : null) ||
        (b.event && typeof b.event === "object" && "venue_id" in b.event
          ? b.event.venue_id
          : null) ||
        null,
      Target: b.target || "",
      CustomerNote: b.customer_note || "",
      OwnerNote: b.owner_note || "",
      Quantity: b.quantity || 1,
      Status: b.status || "Pending",
      Event: b.event || null,
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

  const handleDelete = async (bookingId: string) => {
    if (!bookingId || bookingId === "") {
      alert("Không thể xóa đặt sân: ID không hợp lệ");
      return;
    }
    if (window.confirm("Bạn có chắc chắn muốn hủy đặt sân này?")) {
      try {
        await deleteBooking(bookingId);
      } catch (err) {
        alert("Có lỗi xảy ra khi hủy đặt sân. Vui lòng thử lại.");
      }
    }
  };

  const handleUpdate = async (bookingId: string, newNote: string) => {
    try {
      await updateBooking(bookingId, { customer_note: newNote });
      setEditingBooking(null);
      await refreshBookings();
    } catch (err) {
      alert("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.");
    }
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
                      {booking.IsEvent && booking.Event
                        ? booking.Event.name || "Sự kiện"
                        : booking.GroundName}
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
                  {booking.IsEvent && booking.Event ? (
                    <div className="booking-info-grid">
                      <div className="booking-info-item">
                        <div className="info-icon-wrapper info-icon-blue">
                          <Calendar size={18} />
                        </div>
                        <div className="info-content">
                          <span className="info-label">Tên sự kiện</span>
                          <span className="info-value">
                            {booking.Event.name || "N/A"}
                          </span>
                        </div>
                      </div>

                      {booking.Event.start_date && (
                        <div className="booking-info-item">
                          <div className="info-icon-wrapper info-icon-green">
                            <Clock size={18} />
                          </div>
                          <div className="info-content">
                            <span className="info-label">
                              Thời gian bắt đầu
                            </span>
                            <span className="info-value">
                              {new Date(
                                booking.Event.start_date
                              ).toLocaleString("vi-VN")}
                            </span>
                          </div>
                        </div>
                      )}

                      {booking.Event.end_date && (
                        <div className="booking-info-item">
                          <div className="info-icon-wrapper info-icon-green">
                            <Clock size={18} />
                          </div>
                          <div className="info-content">
                            <span className="info-label">
                              Thời gian kết thúc
                            </span>
                            <span className="info-value">
                              {new Date(booking.Event.end_date).toLocaleString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                        </div>
                      )}

                      {booking.Event.level && (
                        <div className="booking-info-item">
                          <div className="info-icon-wrapper info-icon-purple">
                            <Users size={18} />
                          </div>
                          <div className="info-content">
                            <span className="info-label">Mức độ</span>
                            <span className="info-value">
                              {booking.Event.level}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="booking-info-item">
                        <div className="info-icon-wrapper info-icon-purple">
                          <Users size={18} />
                        </div>
                        <div className="info-content">
                          <span className="info-label">Số vé</span>
                          <span className="info-value">
                            {booking.Quantity} vé
                          </span>
                        </div>
                      </div>

                      {booking.Event.price && (
                        <div className="booking-info-item">
                          <div className="info-icon-wrapper info-icon-orange">
                            <FileText size={18} />
                          </div>
                          <div className="info-content">
                            <span className="info-label">Giá vé</span>
                            <span className="info-value">
                              {Number(booking.Event.price).toLocaleString(
                                "vi-VN"
                              )}{" "}
                              ₫
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="booking-info-grid">
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
                  )}

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
                  {(booking.Status === "Pending" ||
                    booking.Status === "Confirmed") && (
                    <>
                      {editingBooking === booking.BookingID ? (
                        <div
                          style={{ display: "flex", gap: "8px", width: "100%" }}
                        >
                          <input
                            type="text"
                            defaultValue={booking.CustomerNote || ""}
                            placeholder="Nhập ghi chú..."
                            style={{
                              flex: 1,
                              padding: "8px",
                              border: "1px solid #ddd",
                              borderRadius: "4px",
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUpdate(
                                  booking.BookingID,
                                  e.currentTarget.value
                                );
                              }
                              if (e.key === "Escape") {
                                setEditingBooking(null);
                              }
                            }}
                            autoFocus
                          />
                          <button
                            className="booking-action-btn btn-save"
                            onClick={() => {
                              const input = document.querySelector(
                                `input[defaultValue="${
                                  booking.CustomerNote || ""
                                }"]`
                              ) as HTMLInputElement;
                              if (input) {
                                handleUpdate(booking.BookingID, input.value);
                              }
                            }}
                          >
                            Lưu
                          </button>
                          <button
                            className="booking-action-btn btn-cancel"
                            onClick={() => setEditingBooking(null)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="booking-action-btn btn-modify"
                            onClick={() => setEditingBooking(booking.BookingID)}
                          >
                            <Edit size={16} />
                            Sửa ghi chú
                          </button>
                          <button
                            className="booking-action-btn btn-cancel"
                            onClick={() => handleDelete(booking.BookingID)}
                          >
                            <Trash2 size={16} />
                            Hủy đặt sân
                          </button>
                        </>
                      )}
                    </>
                  )}
                  {booking.Status === "Completed" && (
                    <button
                      className="booking-action-btn btn-review"
                      onClick={() => {
                        const venueId = (booking as any).VenueId;
                        if (venueId) {
                          setShowRatingModal(venueId);
                          setRatingStars(0);
                          setRatingReview("");
                        } else {
                          alert("Không tìm thấy thông tin sân để đánh giá");
                        }
                      }}
                    >
                      <Star size={16} />
                      Đánh giá
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div
          className="rating-modal-backdrop"
          onClick={() => setShowRatingModal(null)}
        >
          <div
            className="rating-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rating-modal-header">
              <h3>Đánh giá sân</h3>
              <button
                className="rating-modal-close"
                onClick={() => setShowRatingModal(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="rating-modal-content">
              <div className="rating-stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="rating-star-button"
                    onClick={() => setRatingStars(star)}
                  >
                    <Star
                      size={32}
                      fill={star <= ratingStars ? "currentColor" : "none"}
                      color={star <= ratingStars ? "#FFD700" : "#ccc"}
                    />
                  </button>
                ))}
              </div>
              <textarea
                className="rating-textarea"
                placeholder="Nhập đánh giá của bạn..."
                value={ratingReview}
                onChange={(e) => setRatingReview(e.target.value)}
                rows={4}
              />
              <div className="rating-modal-actions">
                <button
                  className="rating-submit-btn"
                  onClick={async () => {
                    if (ratingStars === 0) {
                      alert("Vui lòng chọn số sao đánh giá");
                      return;
                    }
                    setIsSubmittingRating(true);
                    try {
                      await ratingService.createRating({
                        venue_id: showRatingModal,
                        star_number: ratingStars,
                        review: ratingReview || undefined,
                      });
                      setShowRatingModal(null);
                      setRatingStars(0);
                      setRatingReview("");
                      alert("Đánh giá thành công!");
                    } catch (err: any) {
                      alert(
                        err?.message ||
                          "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại."
                      );
                    } finally {
                      setIsSubmittingRating(false);
                    }
                  }}
                  disabled={isSubmittingRating || ratingStars === 0}
                >
                  {isSubmittingRating ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
                <button
                  className="rating-cancel-btn"
                  onClick={() => {
                    setShowRatingModal(null);
                    setRatingStars(0);
                    setRatingReview("");
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
