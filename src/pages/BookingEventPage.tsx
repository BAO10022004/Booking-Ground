import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/BookingEventPage.css';
import BottomContinueButton from '../components/BottomContinueButton';
import Venue from '../models/Venue';
import ScheduleGrid from '../components/ScheduleGrid';
import DatePickerModal from '../components/DatePickerModal';
import { getCurrentDate } from '../utils/getCurrentDate';
import Toast from '../components/Toast';
import getGrounds from '../utils/getVenues';
import Booking from '../models/booking';
import GetAccount from '../utils/get_account';
import Account from '../models/account';
import bookingTool from '../utils/getBooking';
// //////////////////////////////////////////////// TYPES ////////////////////////////////////////////////
interface BookingSchedulePageProps {
  venueId: string;
  categoryId: string;
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
    // Nếu không truyền cellId, tự động generate
    this.cellId = cellId || `cell-${groundId}-${timeSlot}-${Date.now()}`;
  }

  // Helper method để so sánh cells
  equals(other: Cell): boolean {
    return this.cellId === other.cellId;
  }

  // Helper method để so sánh theo ground và time
  matchesSlot(groundId: string, timeSlot: string): boolean {
    return this.groundId === groundId && this.timeSlot === timeSlot;
  }

  // Helper method để tạo unique key
  getKey(): string {
    return `${this.groundId}-${this.timeSlot}`;
  }
}

// //////////////////////////////////////////////// MAIN COMPONENT ////////////////////////////////////////////////
export default function BookingSchedulePage({ venueId, categoryId }: BookingSchedulePageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const venue = getGrounds().find(v => v.venueId === venueId);
  const account = useMemo(() => GetAccount as Account, []);

  // //////////////////////////////////////////////// STATE //////////////////////////////////////////////// 
  const defaultDate = getCurrentDate(); 
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedCells, setSelectedCells] = useState<Cell[]>([]); // ✅ Đổi từ Set<string> sang Cell[]
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(defaultDate);
  const [toast, setToast] = useState<{ 
    type: 'success' | 'error' | 'warning' | 'info'; 
    message: string 
  } | null>(null);

  // //////////////////////////////////////////////// EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    console.log('📍 Selected Cells:', selectedCells);
    if (!venue) {
      console.error('❌ Venue not found for venueId:', venueId);
    }
    
    if (!account) {
      console.error('❌ Account not found');
    }
  }, [venue, venueId, categoryId, account, navigate, location.state, selectedCells]);

  // //////////////////////////////////////////////// CONSTANTS ////////////////////////////////////////////////
  const timeSlots = [
    '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30'
  ];

  // //////////////////////////////////////////////// HANDLERS ////////////////////////////////////////////////
  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
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
    cells.forEach(cell => {
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
            message: `Sân ${court}: Vui lòng chọn các khung giờ liên tục. Bạn đã chọn ${times[i]} và ${times[i + 1]} không liên tiếp.`,
            bookings: []
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
        duration: times.length * 0.5
      });
    }

    return {
      isValid: true,
      message: 'Thời gian đã chọn hợp lệ.',
      bookings: bookings
    };
  };

  // ✅ Create booking từ Cell[]
  const createBookingFromSelection = (bookingDetails: BookingDetail[]): Booking => {
    console.log('🔄 Submitting booking...', { selectedDate, selectedCells });

    const booking = new Booking();
    
    if (!venue || !account) {
      console.error('Missing venue or account data');
      return booking;
    }

    // Parse selected date
    const [day, month, year] = selectedDate.split('/').map(Number);
    const bookingDate = new Date(year, month - 1, day);
    
    // Generate unique booking ID
    const bookingId = `bkg-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    // Set booking properties
    booking.bookingId = bookingId;
    booking.userId = account.userId;
    booking.date = bookingDate;
    booking.isEvent = categoryId === '2';
    booking.groundId = selectedCells[0].groundId; 

    // Calculate total duration
    booking.amountTime = bookingDetails.reduce((sum, detail) => sum + detail.duration, 0);
    
    // Calculate first start time and last end time
    if (bookingDetails.length > 0) {
      const sortedByTime = [...bookingDetails].sort((a, b) => 
        timeSlots.indexOf(a.startTime) - timeSlots.indexOf(b.startTime)
      );
      booking.startTime = sortedByTime[0].startTime;
      booking.endTime = sortedByTime[sortedByTime.length - 1].endTime;
    }

    return booking;
  };

  // ✅ Handle submit với Cell[]
  const handleSubmit = (cells: Cell[]) => {
    if (cells.length === 0) {
      showToast('warning', 'Vui lòng chọn ít nhất một khung giờ trước khi tiếp tục.');
      return;
    }

    const validation = validateContinuousTimeSlots(cells);
    
    if (!validation.isValid) {
      showToast('error', validation.message);
      return;
    }

    if (!venue) {
      showToast('error', 'Không tìm thấy thông tin sân. Vui lòng thử lại.');
      return;
    }

    if (!account) {
      showToast('error', 'Vui lòng đăng nhập để đặt sân.');
      return;
    }

    const booking = createBookingFromSelection(validation.bookings);
    bookingTool.addBooking(booking);
    console.log('✅ Booking created:', booking);

    showToast('success', 'Đang chuyển đến trang xác nhận...');
    
    setTimeout(() => {
      navigate('/booking-confirmation/{}');
      navigate(`/booking-confirmation/${booking?.bookingId}/`);

    }, 500);
  };

  const handleDateClick = () => {
    setTempDate(selectedDate);
    setShowDatePicker(true);
  };

  const handleDateConfirm = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
      setSelectedCells([]); // ✅ Reset về empty array
      showToast('info', `Đã chuyển sang ngày ${tempDate}`);
    }
    setShowDatePicker(false);
  };

  const handleDateCancel = () => {
    setShowDatePicker(false);
  };

  // //////////////////////////////////////////////// LOADING STATE ////////////////////////////////////////////////
  if (!venue) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666',
        gap: '16px'
      }}>
        <div>Đang tải thông tin sân...</div>
        <div style={{ fontSize: '14px', color: '#999' }}>
          Venue ID: {venueId}
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666',
        gap: '16px'
      }}>
        <div>Vui lòng đăng nhập để đặt sân</div>
        <button 
          onClick={() => navigate('/login')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Đăng nhập
        </button>
      </div>
    );
  }

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
            <h1 className="booking-header-title">
              {venue.name}
            </h1>
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
          <span className="booking-notice-label">Lưu ý:</span> 
          Nếu bạn cần đặt lịch có định vui lòng liên hệ: 0374.857.068 để được hỗ trợ
        </div>

        {/* Schedule Grid */}
        <ScheduleGrid 
          venue={venue} 
          categories={categoryId}
          selectedCells={selectedCells} 
          setSelectedCells={setSelectedCells}
        />
      </div>

      {/* Bottom Button */}
      <BottomContinueButton 
        handleSubmit={handleSubmit} 
        selectedCells={selectedCells}
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
    </div>
  );
}