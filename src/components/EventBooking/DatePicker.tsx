import React, { useState } from 'react';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../assets/styles/DatePicker.css'
interface DatePickerProps {
  onSelect: (start: Date, end: Date) => void;
  onClose: () => void;
}

function DatePicker({ onSelect, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onSelect(startDate, endDate);
    }
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const addRippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.classList.add('ripple-effect');
    setTimeout(() => button.classList.remove('ripple-effect'), 600);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="date-picker-backdrop" onClick={onClose}>
      <div className="date-picker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Chọn khoảng thời gian</h3>
          <button
            onClick={onClose}
            className="modal-close-button"
          >
            ✕
          </button>
        </div>

        <div className="calendar-container">
          <div className="calendar-nav">
            <button
              onClick={previousMonth}
              className="calendar-nav-button"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="calendar-month-year">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={nextMonth}
              className="calendar-nav-button"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="calendar-weekdays">
            {daysOfWeek.map(day => (
              <div key={day} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="calendar-day empty" />;
              }

              const isStart = isSameDay(date, startDate);
              const isEnd = isSameDay(date, endDate);
              const inRange = isInRange(date);
              const isToday = isSameDay(date, new Date());

              let className = 'calendar-day';
              if (isStart) className += ' start-date';
              if (isEnd) className += ' end-date';
              if (inRange && !isStart && !isEnd) className += ' in-range';
              if (isToday && !isStart && !isEnd) className += ' today';

              return (
                <button
                  key={date.toISOString()}
                  onClick={(e) => {
                    handleDateClick(date);
                    addRippleEffect(e);
                  }}
                  className={className}
                >
                  <span>{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="selected-dates-display">
          <div className="date-display-row">
            <span className="date-label">Từ:</span>
            <span className={`date-value ${!startDate ? 'empty' : ''}`}>
              {startDate ? startDate.toLocaleDateString('vi-VN') : '---'}
            </span>
          </div>
          <div className="date-display-row">
            <span className="date-label">Đến:</span>
            <span className={`date-value ${!endDate ? 'empty' : ''}`}>
              {endDate ? endDate.toLocaleDateString('vi-VN') : '---'}
            </span>
          </div>
        </div>

        <div className="modal-actions">
          <button
            onClick={(e) => {
              addRippleEffect(e);
              onClose();
            }}
            className="modal-button modal-button-cancel"
          >
            Hủy
          </button>
          <button
            onClick={(e) => {
              if (startDate && endDate) {
                addRippleEffect(e);
                handleConfirm();
              }
            }}
            disabled={!startDate || !endDate}
            className="modal-button modal-button-confirm"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default DatePicker