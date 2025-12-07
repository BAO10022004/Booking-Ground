import React, { useState } from 'react';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../assets/styles/HeaderEventBoking.css'
function HeaderEventBooking({ 
    
  selectedDateRange, 
  setSelectedDateRange,
  setShowDatePicker
}: {
  selectedDateRange: string;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<string>>;
  setShowDatePicker:  React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleBack = () => {
    console.log('Go back');
    window.history.back();
  };
  
  const handleDateRangeClick = () => {
    if (setSelectedDateRange) {
      setSelectedDateRange(selectedDateRange);
    }
  };
  
   return (
    <>
      {/* Header */}
      <div className="events-header">
        <button 
          className="back-button"
          onClick={handleBack}
          aria-label="Quay lại"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="events-title">Đặt lịch sự kiện</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Date Range Selector */}
      <div 
        className="date-range-selector"
        onClick={()=> {setShowDatePicker(true);}}
      >
        <span className="date-range-text">
          {selectedDateRange || 'Chọn khoảng thời gian'}
        </span>
        <Calendar size={20} className="date-range-icon" />
      </div>
    </>
  );
}
export default HeaderEventBooking