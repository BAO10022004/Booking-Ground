import React, { useState } from 'react';
import { ArrowLeft, Calendar, AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import '../assets/styles/BookingEventPage.css';
import BottomContinueButton from '../components/BottomContinueButton';
import Venue from '../models/Venue';
import ScheduleGrid from '../components/ScheduleGrid';
import DatePickerModal from '../components/DatePickerModal';
import { getCurrentDate } from '../utils/getCurrentDate';
import { useNavigate } from 'react-router-dom'; 
import Toast from '../components/Toast';


// //////////////////////////////////////////////// MAIN COMPONENT ////////////////////////////////////////////////
export default function BookingSchedulePage({venue}: {venue: Venue}) {

  // //////////////////////////////////////////////// STATE //////////////////////////////////////////////// 
  const defaultDate = getCurrentDate(); 
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(defaultDate);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
  const navigate = useNavigate();

  // //////////////////////////////////////////////// TOAST HELPER ////////////////////////////////////////////////
  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleBack = () => {
    window.history.back();
  };

  const timeSlots = [
    '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30'
  ];

  // //////////////////////////////////////////////// HANDLERS ////////////////////////////////////////////////

  const validateContinuousTimeSlots = (selectedCells: Set<string>) => {
    const groupedByCourt: { [key: string]: string[] } = {};
    
    selectedCells.forEach(cell => {
      const [court, time] = cell.split('-');
      if (!groupedByCourt[court]) {
        groupedByCourt[court] = [];
      }
      groupedByCourt[court].push(time);
    });

    const bookings: Array<{ court: string; startTime: string; endTime: string; duration: number }> = [];
    
    for (const court in groupedByCourt) {
      const times = groupedByCourt[court];
      
      times.sort((a, b) => {
        const indexA = timeSlots.indexOf(a);
        const indexB = timeSlots.indexOf(b);
        return indexA - indexB;
      });

      for (let i = 0; i < times.length - 1; i++) {
        const currentIndex = timeSlots.indexOf(times[i]);
        const nextIndex = timeSlots.indexOf(times[i + 1]);
        
        if (nextIndex - currentIndex !== 1) {
          return {
            isValid: false,
            message: `Sân ${court}: Vui lòng chọn các khung giờ liên tục. Bạn đã chọn ${times[i]} và ${times[i + 1]} không liên tiếp.`,
            bookings: []
          };
        }
      }

      const startTime = times[0];
      const lastTimeIndex = timeSlots.indexOf(times[times.length - 1]);
      const endTime = timeSlots[lastTimeIndex + 1] || times[times.length - 1];
      
      bookings.push({
        court,
        startTime,
        endTime,
        duration: times.length * 0.5
      });
    }

    return {
      isValid: true,
      message: 'Thời gian đã chọn hợp lệ.',
      bookings: bookings
    };
  };

  const handleSubmit = (selectedCells: Set<string>) => {
    if (selectedCells.size === 0) {
      showToast('warning', 'Vui lòng chọn ít nhất một khung giờ trước khi tiếp tục.');
      return;
    }

    const validation = validateContinuousTimeSlots(selectedCells);
    
    if (!validation.isValid) {
      showToast('error', validation.message);
      return;
    }

    showToast('success', 'Đang chuyển đến trang xác nhận...');
    
    setTimeout(() => {
      navigate('/booking-confirmation', { state: { 
        date: selectedDate,
        venue: venue
      }});
    }, 500);
  };

  const handleDateClick = () => {
    setTempDate(selectedDate);
    setShowDatePicker(true);
  };

  const handleDateConfirm = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
      setSelectedCells(new Set()); 
      showToast('info', `Đã chuyển sang ngày ${tempDate}`);
    }
    setShowDatePicker(false);
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
  };

  // //////////////////////////////////////////////// RENDER ////////////////////////////////////////////////
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
            <h1 className="booking-header-title">Đặt lịch ngay trực quan</h1>
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
          <div className="booking-legend-item">
            <div className="booking-legend-box legend-event"></div>
            <span>Sự kiện</span>
          </div>
          <button className="booking-view-courts-btn">
            Xem sân & bảng giá
          </button>
        </div>

        {/* Notice */}
        <div className="booking-notice">
          <span className="booking-notice-label">Lưu ý:</span> Nếu bạn cần đặt lịch có định vui lòng liên hệ: 0374.857.068 để được hỗ trợ
        </div>

        {/* Schedule Grid */}
        <ScheduleGrid venue={venue} selectedCells={selectedCells} setSelectedCells={setSelectedCells}></ScheduleGrid>
      </div>

      {/* Bottom Button */}
      <BottomContinueButton handleSubmit={handleSubmit} selectedCells={selectedCells}/>

      {/* Date Picker Modal */}
      <DatePickerModal showDatePicker={showDatePicker}
                       tempDate={tempDate}
                       handleDateCancel={handleDateCancel}
                       setTempDate={setTempDate}
                       handleDateConfirm={handleDateConfirm}/>

      {/* Bottom spacing */}
      <div className="booking-bottom-spacing"></div>
    </div>
  );
}