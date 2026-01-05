import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, X } from "lucide-react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "../assets/styles/BookingEventPage.css";
import BottomContinueButton from "../components/BottomContinueButton";
import ScheduleGrid from "../components/ScheduleGrid";
import DatePickerModal from "../components/DatePickerModal";
import CategorySelectionModal from "../components/CategorySelectionModal";
import Toast from "../components/Toast";
import { useVenue, useAuth, useGrounds } from "../hooks";
import { getCurrentDate } from "../utils/helpers";
import { venueService } from "../services";
import { calculateHours } from "../utils/helpers/calculateHelpers";

interface BookingSchedulePageProps {
  venueId: string;
}

interface BookingDetail {
  ground: string;
  startTime: string;
  endTime: string;
  duration: number;
}

class Cell {
  cellId: string;
  groundId: string;
  timeSlot: string;

  constructor(groundId: string, timeSlot: string, cellId?: string) {
    this.groundId = groundId;
    this.timeSlot = timeSlot;
    this.cellId = cellId || `cell-${groundId}-${timeSlot}-${Date.now()}`;
  }

  equals(other: Cell): boolean {
    return this.cellId === other.cellId;
  }

  matchesSlot(groundId: string, timeSlot: string): boolean {
    return this.groundId === groundId && this.timeSlot === timeSlot;
  }

  getKey(): string {
    return `${this.groundId}-${this.timeSlot}`;
  }
}

export default function BookingSchedulePage({
  venueId,
}: BookingSchedulePageProps) {
  const navigate = useNavigate();
  const { venue: apiVenue, loading: venueLoading } = useVenue(venueId);
  const { user: account, loading: authLoading } = useAuth();
  const { grounds, loading: groundsLoading } = useGrounds(venueId);

  const venue = apiVenue
    ? {
        ...apiVenue,
        venueId: apiVenue.venueId,
        name: apiVenue.name,
      }
    : null;

  const loading = venueLoading || authLoading;

  const defaultDate = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(defaultDate);
  const [toast, setToast] = useState<{
    type: "success" | "error" | "warning" | "info";
    message: string;
  } | null>(null);
  const [showCourtsModal, setShowCourtsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [priceLoading, setPriceLoading] = useState(false);

  useEffect(() => {
    // Load categories from venue
    if (venue && (venue as any).categories) {
      const venueCategories = (venue as any).categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
      }));
      setCategories(venueCategories);
    }
  }, [venue, venueId, account]);

  // Show category modal on mount if no selection
  useEffect(() => {
    if (!selectedCategoryId && venueId) {
      setShowCategoryModal(true);
    }
  }, [venueId]);

  // Calculate price when selection changes
  useEffect(() => {
    const calculatePrice = async () => {
      if (
        selectedCells.length === 0 ||
        !venue?.venueId ||
        !selectedDate ||
        !selectedCategoryId
      ) {
        setTotalPrice(0);
        setTotalHours(0);
        return;
      }

      try {
        setPriceLoading(true);
        const validation = validateContinuousTimeSlots(selectedCells);
        if (!validation.isValid || validation.bookings.length === 0) {
          setTotalPrice(0);
          setTotalHours(0);
          return;
        }

        const booking = validation.bookings[0];
        const [day, month, year] = selectedDate.split("/").map(Number);
        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;

        const calculatedHours = calculateHours(
          booking.startTime,
          booking.endTime
        );

        try {
          // Get ground to get categoryId
          const ground = grounds.find((g) => g.groundId === booking.ground);
          const categoryId = ground?.categoryId;

          const result = await venueService.calculatePrice({
            venueId: venue.venueId,
            date: dateStr,
            startTime: booking.startTime,
            endTime: booking.endTime,
            groundId: booking.ground,
            categoryId: categoryId,
            target: selectedCategoryId === "student" ? "student" : "adult",
          });

          setTotalPrice(result.totalPrice || 0);
          setTotalHours(result.totalHours || calculatedHours);
        } catch (error) {
          setTotalHours(calculatedHours);
          setTotalPrice(0);
        }
      } catch (error) {
        setTotalPrice(0);
        setTotalHours(0);
      } finally {
        setPriceLoading(false);
      }
    };

    calculatePrice();
  }, [
    selectedCells,
    venue?.venueId,
    selectedDate,
    selectedCategoryId,
    selectedCategoryName,
  ]);

  // //////////////////////////////////////////////// CONSTANTS ////////////////////////////////////////////////
  const timeSlots = [
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
  ];

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleBack = () => {
    window.history.back();
  };

  // ✅ Validate với Cell[]
  const validateContinuousTimeSlots = (cells: Cell[]) => {
    const groupedByCourt: { [key: string]: string[] } = {};

    // Group cells by ground
    cells.forEach((cell) => {
      if (!groupedByCourt[cell.groundId]) {
        groupedByCourt[cell.groundId] = [];
      }
      groupedByCourt[cell.groundId].push(cell.timeSlot);
    });

    const bookings: BookingDetail[] = [];

    for (const court in groupedByCourt) {
      const times = groupedByCourt[court];

      // Sort times
      times.sort((a, b) => {
        const indexA = timeSlots.indexOf(a);
        const indexB = timeSlots.indexOf(b);
        return indexA - indexB;
      });

      // Validate continuous slots
      for (let i = 0; i < times.length - 1; i++) {
        const currentIndex = timeSlots.indexOf(times[i]);
        const nextIndex = timeSlots.indexOf(times[i + 1]);

        if (nextIndex - currentIndex !== 1) {
          return {
            isValid: false,
            message: `Sân ${court}: Vui lòng chọn các khung giờ liên tục. Bạn đã chọn ${
              times[i]
            } và ${times[i + 1]} không liên tiếp.`,
            bookings: [],
          };
        }
      }

      // Calculate booking details
      const startTime = times[0];
      const lastTimeIndex = timeSlots.indexOf(times[times.length - 1]);
      const endTime = timeSlots[lastTimeIndex + 1] || times[times.length - 1];

      bookings.push({
        ground: court,
        startTime,
        endTime,
        duration: times.length * 0.5,
      });
    }

    return {
      isValid: true,
      message: "Thời gian đã chọn hợp lệ.",
      bookings: bookings,
    };
  };

  const createTempBookingData = (cells: Cell[]) => {
    const validation = validateContinuousTimeSlots(cells);
    if (!validation.isValid) {
      showToast("error", validation.message);
      return null;
    }

    const bookingDetails = validation.bookings;
    if (bookingDetails.length === 0) {
      showToast("error", "Không có thông tin đặt sân hợp lệ.");
      return null;
    }

    const sortedByTime = [...bookingDetails].sort(
      (a, b) => timeSlots.indexOf(a.startTime) - timeSlots.indexOf(b.startTime)
    );

    const startTime = sortedByTime[0].startTime;
    const endTime = sortedByTime[sortedByTime.length - 1].endTime;
    const groundId = cells[0].groundId;

    const [day, month, year] = selectedDate.split("/").map(Number);
    const bookingDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return {
      date: bookingDate,
      start_time: startTime,
      end_time: endTime,
      ground_id: groundId,
      is_event: false,
      quantity: 1,
      target: selectedCategoryName || undefined,
      venueId: venue?.venueId,
      totalPrice,
      total_price: totalPrice, // Thêm total_price cho API
      totalHours,
    };
  };

  const proceedToConfirmation = (cells: Cell[]) => {
    const tempBookingData = createTempBookingData(cells);
    if (!tempBookingData) return;

    localStorage.setItem("tempBookingData", JSON.stringify(tempBookingData));
    navigate("/booking-confirmation");
  };

  const handleSubmit = async (cells: Cell[]) => {
    if (cells.length === 0) {
      showToast(
        "warning",
        "Vui lòng chọn ít nhất một khung giờ trước khi tiếp tục."
      );
      return;
    }

    const validation = validateContinuousTimeSlots(cells);

    if (!validation.isValid) {
      showToast("error", validation.message);
      return;
    }

    if (!venue) {
      showToast("error", "Không tìm thấy thông tin sân. Vui lòng thử lại.");
      return;
    }

    if (!account) {
      showToast("error", "Vui lòng đăng nhập để đặt sân.");
      return;
    }

    if (!selectedCategoryId) {
      showToast("warning", "Vui lòng chọn đối tượng áp dụng.");
      setShowCategoryModal(true);
      return;
    }

    const bookingDetails = validation.bookings;
    if (bookingDetails.length === 0) {
      showToast("error", "Không có thông tin đặt sân hợp lệ.");
      return;
    }

    proceedToConfirmation(cells);
  };

  const handleDateClick = () => {
    setTempDate(selectedDate);
    setShowDatePicker(true);
  };

  const handleDateConfirm = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
      setSelectedCells([]); // ✅ Reset về empty array
      showToast("info", `Đã chuyển sang ngày ${tempDate}`);
    }
    setShowDatePicker(false);
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
          gap: "16px",
        }}
      >
        <div>Đang tải thông tin sân...</div>
        <div style={{ fontSize: "14px", color: "#999" }}>
          Venue ID: {venueId}
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
          gap: "16px",
        }}
      >
        <div>Không tìm thấy thông tin sân</div>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 24px",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  if (!account) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#666",
          gap: "16px",
        }}
      >
        <div>Vui lòng đăng nhập để đặt sân</div>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#1890ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Đăng nhập
        </button>
      </div>
    );
  }

  return (
    <div className="booking-schedule-page">
      {/* Toast Notification */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="booking-header">
        <div className="booking-header-container">
          <div className="booking-header-left">
            <button className="booking-back-btn" onClick={handleBack}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="booking-header-title">{venue.name}</h1>
          </div>
          <button className="booking-date-btn" onClick={handleDateClick}>
            <span>{selectedDate}</span>
            <Calendar size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="booking-content">
        {/* Legend */}
        <div className="booking-legend">
          <div className="booking-legend-item">
            <div className="booking-legend-box legend-available"></div>
            <span>Trống</span>
          </div>
          <div className="booking-legend-item">
            <div className="booking-legend-box legend-booked"></div>
            <span>Đã đặt</span>
          </div>
          <div className="booking-legend-item">
            <div className="booking-legend-box legend-locked"></div>
            <span>Khóa</span>
          </div>
          <button
            className="booking-view-courts-btn"
            onClick={() => setShowCourtsModal(true)}
          >
            Xem sân & bảng giá
          </button>
        </div>

        {/* Notice */}
        <div className="booking-notice">
          <span className="booking-notice-label">Lưu ý:</span>
          Nếu bạn cần đặt lịch có định vui lòng liên hệ: 0374.857.068 để được hỗ
          trợ
        </div>

        {/* Schedule Grid */}
        <ScheduleGrid
          venue={venue}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          selectedDate={selectedDate}
          categoryId={selectedCategoryId || undefined}
        />
      </div>

      {/* Bottom Button */}
      <BottomContinueButton
        handleSubmit={handleSubmit}
        selectedCells={selectedCells}
        totalHours={totalHours}
        totalPrice={totalPrice}
        loading={priceLoading}
      />

      {/* Category Selection Modal */}
      <CategorySelectionModal
        isOpen={showCategoryModal}
        onClose={() => {
          // Don't allow closing without selection if categories exist
          if (categories.length > 0 && !selectedCategoryId) {
            showToast("warning", "Vui lòng chọn đối tượng áp dụng");
            return;
          }
          setShowCategoryModal(false);
        }}
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={(categoryId, categoryName) => {
          setSelectedCategoryId(categoryId);
          setSelectedCategoryName(categoryName);
          setShowCategoryModal(false);
        }}
        sportName={venue?.name || "Cầu Lông"}
      />

      {/* Date Picker Modal */}
      <DatePickerModal
        showDatePicker={showDatePicker}
        tempDate={tempDate}
        handleDateCancel={handleDateCancel}
        setTempDate={setTempDate}
        handleDateConfirm={handleDateConfirm}
      />

      {/* Bottom spacing */}
      <div className="booking-bottom-spacing"></div>

      {/* Courts & Price Modal */}
      {showCourtsModal &&
        ReactDOM.createPortal(
          <div
            className="booking-modal-backdrop"
            onClick={() => setShowCourtsModal(false)}
          >
            <div
              className="booking-modal-container"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "600px", maxHeight: "80vh", overflow: "auto" }}
            >
              <button
                onClick={() => setShowCourtsModal(false)}
                className="booking-modal-close"
                aria-label="Đóng"
              >
                <X size={24} />
              </button>

              <div className="booking-modal-header">
                <h2 className="booking-modal-title">Sân & Bảng giá</h2>
              </div>

              <div style={{ padding: "1rem" }}>
                {groundsLoading ? (
                  <div style={{ padding: "2rem", textAlign: "center" }}>
                    Đang tải...
                  </div>
                ) : grounds.length === 0 ? (
                  <div style={{ padding: "2rem", textAlign: "center" }}>
                    Chưa có thông tin sân
                  </div>
                ) : (
                  <div>
                    <h3
                      style={{
                        marginBottom: "1rem",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      Danh sách sân
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {grounds.map((ground) => (
                        <div
                          key={ground.groundId}
                          style={{
                            padding: "1rem",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            backgroundColor: "#f9fafb",
                          }}
                        >
                          <div
                            style={{ fontWeight: 600, marginBottom: "0.5rem" }}
                          >
                            {ground.name}
                          </div>
                          <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                            Mã sân: {ground.groundId.slice(0, 8)}...
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        marginTop: "2rem",
                        padding: "1rem",
                        backgroundColor: "#fef3c7",
                        borderRadius: "8px",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "#92400e",
                          margin: 0,
                        }}
                      >
                        <strong>Lưu ý:</strong> Để xem bảng giá chi tiết theo
                        khung giờ, vui lòng liên hệ trực tiếp với sân hoặc chọn
                        khung giờ trên lịch để xem giá.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
