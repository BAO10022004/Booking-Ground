import React, { useState } from 'react';
import { ArrowLeft, Calendar, Info, ArrowRight, Users } from 'lucide-react';
import '../assets/styles/EventsBookingPage.css';
import { useNavigate } from 'react-router-dom';
import HeaderEventBooking from '../components/EventBooking/HeaderEventBoking';
import DatePicker from '../components/EventBooking/DatePicker'; 
// Mock data cho events
const mockEvents = [
  {
    id: 'event-348',
    title: '#348: [Xé vé] - Social',
    time: '16h - 21h',
    sport: 'Pickleball 3',
    level: '1.0 → 2.0',
    participants: 4,
    maxParticipants: 99,
    price: '60k/Vé',
    date: '06/12/2025',
    avatars: [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3'
    ]
  },
  {
    id: 'event-349',
    title: '#349: Giải đấu cuối tuần',
    time: '14h - 18h',
    sport: 'Bóng đá 5',
    level: '2.0 → 3.5',
    participants: 8,
    maxParticipants: 20,
    price: '80k/Vé',
    date: '07/12/2025',
    avatars: [
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
      'https://i.pravatar.cc/150?img=6'
    ]
  },
  {
    id: 'event-350',
    title: '#350: Giao lưu thân thiện',
    time: '08h - 10h',
    sport: 'Tennis',
    level: '1.5 → 2.5',
    participants: 6,
    maxParticipants: 16,
    price: '70k/Vé',
    date: '08/12/2025',
    avatars: [
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8'
    ]
  },
  {
    id: 'event-351',
    title: '#351: [Pro] - Championship',
    time: '18h - 22h',
    sport: 'Pickleball 5',
    level: '3.0 → 4.0',
    participants: 12,
    maxParticipants: 40,
    price: '100k/Vé',
    date: '09/12/2025',
    avatars: [
      'https://i.pravatar.cc/150?img=9',
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
      'https://i.pravatar.cc/150?img=12'
    ]
  }
];
const isDateInRangeIgnoreTime = (date: Date, startDate: Date, endDate: Date): boolean => {
  const resetTime = (d: Date) => {
    const newDate = new Date(d);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };
  
  const checkDate = resetTime(date);
  const start = resetTime(startDate);
  const end = resetTime(endDate);
  
  return checkDate >= start && checkDate <= end;
};
const EventsBookingPage = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [events] = useState(mockEvents);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const formatDateRange = (start: Date, end: Date) => {
    setStart( start.toLocaleDateString('vi-VN'))
    setEnd(end.toLocaleDateString('vi-VN'))
    return `${start.toLocaleDateString('vi-VN')} - ${end.toLocaleDateString('vi-VN')}`;
  };

    const handleDateSelect = (start: Date, end: Date) => {
    setSelectedDateRange(formatDateRange(start, end));
    setShowDatePicker(false);
  };
  const handleEventClick = (eventId: string) => {
    console.log('View event details:', eventId);
  };

  return (
    <div className="events-booking-page">
      {/*Header */ }
        <HeaderEventBooking  selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} setShowDatePicker={setShowDatePicker}/>
        
    {showDatePicker == true? (
        <DatePicker
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      ):<></>}

      {/* Events List */}
      <div className="events-list">
        {events.map((event) => (
        (selectedDateRange == '' ? true :isDateInRangeIgnoreTime(new Date(event.date), new Date(start), new Date(end))  == true) == true ?
        
         <div key={event.id} className="event-card">
            {/* Event Header */}
            <div className="event-card-header">
              <div className="event-header-left">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-time">{event.time} | {event.sport}</p>
              </div>
              <span className="event-date">{event.date}</span>
            </div>

            {/* Event Body */}
            <div className="event-card-body">
              {/* Sport Level Badge */}
              <div className="event-sport-badge">
                <div className="sport-icon">🎾</div>
                <div className="sport-info">
                  <span className="sport-name">Pickleball</span>
                  <span className="sport-level">{event.level}</span>
                </div>
              </div>

              {/* Participants */}
              <div className="event-participants">
                <div className="participants-avatars">
                  {event.avatars.map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Participant ${index + 1}`}
                      className="participant-avatar"
                    />
                  ))}
                </div>
                <span className="participants-count">
                  {event.participants}/{event.maxParticipants}
                </span>
              </div>

              {/* Info Button */}
              <button className="event-info-button">
                <Info size={20} />
              </button>
            </div>

            {/* Event Footer */}
            <div className="event-card-footer">
              <div className="event-price-badge">
                {event.price}
              </div>
              <button 
                className="event-join-button"
                onClick={() => handleEventClick(event.id)}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
         
         :
         <></>
          
        ))}
      </div>
    </div>
  );
};

export default EventsBookingPage;