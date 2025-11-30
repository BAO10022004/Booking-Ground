
import Venue from "../models/Venue";
import GetListCategory from "../utils/getCategory";
function ScheduleGrid({venue, selectedCells, setSelectedCells}: {venue: Venue, selectedCells: Set<string>, setSelectedCells: (cells: Set<string>) => void}) {
    const courts = GetListCategory(venue);
    const timeSlots = [
    '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00', '9:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30'
    ];
    const bookedSlots = new Set([
        'A-8:00', 'A-8:30', 'A-9:00', 'A-9:30', 'A-10:00', 'A-10:30',
    ]);

    // Các ô đang bị khóa (màu xám đậm)
    const lockedSlots = new Set([
        'A-6:00', 'A-6:30', 'A-7:00', 'A-7:30',
    ]);
    /////////////////////////////// handleCellClick ///////////////////////////////
        const handleCellClick = (court: string, time: string) => {
        const cellId = `${court}-${time}`;
        if (bookedSlots.has(cellId) || lockedSlots.has(cellId)) return;

        const newSelected = new Set(selectedCells);
        if (newSelected.has(cellId)) {
        newSelected.delete(cellId);
        } else {
        newSelected.add(cellId);
        }
        setSelectedCells(newSelected);
    };
    /////////////////////////////// getCellClass ///////////////////////////////
    const getCellClass = (court: string, time: string) => {
        const cellId = `${court}-${time}`;
        if (bookedSlots.has(cellId)) return 'booking-slot-cell slot-booked';
        if (lockedSlots.has(cellId)) return 'booking-slot-cell slot-locked';
        if (selectedCells.has(cellId)) return 'booking-slot-cell slot-selected';
        return 'booking-slot-cell slot-available';
    };
    return (
        <div className="booking-schedule-container">
          <div className="booking-schedule-scroll">
            <div className="booking-schedule-grid">
              {/* Time Headers */}
              <div className="booking-time-header">
                <div className="booking-court-header-cell"></div>
                {timeSlots.map((time) => (
                  <div key={time} className="booking-time-cell">
                    {time}
                  </div>
                ))}
              </div>

              {/* Court Rows */}
              {courts.map((court) => (
                <div key={court} className="booking-court-row">
                  <div className="booking-court-label">{court}</div>
                  {timeSlots.map((time) => (
                    <div
                      key={`${court}-${time}`}
                      onClick={() => handleCellClick(court, time)}
                      className={getCellClass(court, time)}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
    )
}
export default ScheduleGrid;