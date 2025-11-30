import type { MouseEventHandler } from "react";
import '../assets/styles/DatePickerModal.css';
interface DatePickerModalProps {
  showDatePicker: boolean;
  handleDateCancel: () => void;
  tempDate: string;
  setTempDate: React.Dispatch<React.SetStateAction<string>>;
  handleDateConfirm: () => void;
}

function DatePickerModal({
  showDatePicker,
  handleDateCancel,
  tempDate,
  setTempDate,
  handleDateConfirm
}: DatePickerModalProps) {
  // Nếu KHÔNG hiển thị thì return null
  if (!showDatePicker) {
    return null;
  }

  return (
    <div className="date-picker-backdrop" onClick={handleDateCancel}>
      <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="date-picker-header">Chọn ngày đặt sân</h3>
        <input
          type="date"
          className="date-picker-input"
          value={tempDate.split('/').reverse().join('-')}
          onChange={(e) => {
            const date = new Date(e.target.value);
            const formatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            setTempDate(formatted);
          }}
        />
        <div className="date-picker-buttons">
          <button className="date-picker-cancel" onClick={handleDateCancel}>
            Hủy
          </button>
          <button className="date-picker-confirm" onClick={handleDateConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default DatePickerModal;