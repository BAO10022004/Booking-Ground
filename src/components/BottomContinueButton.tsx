import '../assets/styles/BottomContinueButton.css';

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
  handleSubmit: (selectedCells: Cell[]) => void; // ✅ Đổi từ Set<string> sang Cell[]
  selectedCells: Cell[]; // ✅ Đổi từ Set<string> sang Cell[]
}

function BottomContinueButton({ handleSubmit, selectedCells }: BottomContinueButtonProps) {
  return (
    <div className="booking-bottom-bar">
      <div className="booking-bottom-container">
        <button 
          className="booking-submit-btn" 
          onClick={() => handleSubmit(selectedCells)}
          disabled={selectedCells.length === 0} // ✅ Đổi từ size sang length
        >
          TIẾP THEO {selectedCells.length > 0 && `(${selectedCells.length})`} 
          {/* ✅ Đổi từ size sang length */}
        </button>
      </div>
    </div>
  );
}

export default BottomContinueButton;