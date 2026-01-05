import "../assets/styles/BottomContinueButton.css";

// ✅ Import hoặc định nghĩa Cell class
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

interface BottomContinueButtonProps {
  handleSubmit: (selectedCells: Cell[]) => void;
  selectedCells: Cell[];
  totalHours?: number;
  totalPrice?: number;
  loading?: boolean;
}

function BottomContinueButton({
  handleSubmit,
  selectedCells,
  totalHours = 0,
  totalPrice = 0,
  loading = false,
}: BottomContinueButtonProps) {
  const hasSelection = selectedCells.length > 0;

  return (
    <div className="booking-bottom-bar">
      <div className="booking-bottom-container">
        {hasSelection && (
          <div className="booking-summary">
            <div className="booking-summary-item">
              <span className="booking-summary-label">Tổng giờ:</span>
              <span className="booking-summary-value">
                {totalHours > 0
                  ? (() => {
                      const hours = Math.floor(totalHours);
                      const minutes = Math.round((totalHours - hours) * 60);
                      if (minutes === 0) {
                        return `${hours}h`;
                      } else if (hours === 0) {
                        return `${minutes}p`;
                      } else {
                        return `${hours}h${minutes}p`;
                      }
                    })()
                  : "0h"}
              </span>
            </div>
            <div className="booking-summary-item">
              <span className="booking-summary-label">Tổng tiền:</span>
              <span className="booking-summary-value price">
                {totalPrice > 0
                  ? `${totalPrice.toLocaleString("vi-VN")} ₫`
                  : "0 ₫"}
              </span>
            </div>
          </div>
        )}
        <button
          className="booking-submit-btn"
          onClick={() => handleSubmit(selectedCells)}
          disabled={!hasSelection || loading}
        >
          {loading ? "Đang tính..." : "TIẾP THEO"}
        </button>
      </div>
    </div>
  );
}

export default BottomContinueButton;
