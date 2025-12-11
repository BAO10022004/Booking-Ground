import { useState, useEffect } from "react";
import { Venue } from "../models/Venue";
import GetGroundByVenue from "../utils/GetGround";
import Venue from "../models/Venue";
import { useGrounds } from "../hooks";
import Ground from "../models/Ground";

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

interface ScheduleGridProps {
  venue: Venue;
  selectedCells: Cell[];
  setSelectedCells: (cells: Cell[]) => void;
}

function ScheduleGrid({
  venue,
  selectedCells,
  setSelectedCells,
}: ScheduleGridProps) {
  const { grounds, loading } = useGrounds(venue.venueId);

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

  // ✅ Giữ nguyên dạng Set<string> cho booked và locked (để dễ check)
  const bookedSlots = new Set([
    "A-8:00",
    "A-8:30",
    "A-9:00",
    "A-9:30",
    "A-10:00",
    "A-10:30",
  ]);

  const lockedSlots = new Set(["A-6:00", "A-6:30", "A-7:00", "A-7:30"]);

  /////////////////////////////// handleCellClick ///////////////////////////////
  const handleCellClick = (groundId: string, time: string) => {
    const cellKey = `${groundId}-${time}`;

    // Check if slot is booked or locked
    if (bookedSlots.has(cellKey) || lockedSlots.has(cellKey)) return;

    // ✅ Tìm cell đã tồn tại trong selectedCells
    const existingCellIndex = selectedCells.findIndex((cell) =>
      cell.matchesSlot(groundId, time)
    );

    let newSelected: Cell[];

    if (existingCellIndex !== -1) {
      // ✅ Cell đã được chọn -> Xóa nó
      newSelected = selectedCells.filter(
        (_, index) => index !== existingCellIndex
      );
    } else {
      // ✅ Cell chưa được chọn -> Thêm mới
      const newCell = new Cell(groundId, time);
      newSelected = [...selectedCells, newCell];
    }

    setSelectedCells(newSelected);
  };

  /////////////////////////////// getCellClass ///////////////////////////////
  const getCellClass = (groundId: string, time: string) => {
    const cellKey = `${groundId}-${time}`;

    if (bookedSlots.has(cellKey)) return "booking-slot-cell slot-booked";
    if (lockedSlots.has(cellKey)) return "booking-slot-cell slot-locked";

    // ✅ Check nếu cell được chọn
    const isSelected = selectedCells.some((cell) =>
      cell.matchesSlot(groundId, time)
    );
    if (isSelected) return "booking-slot-cell slot-selected";

    return "booking-slot-cell slot-available";
  };

  if (loading) {
    return (
      <div className="booking-schedule-container">
        <div style={{ padding: "20px", textAlign: "center" }}>
          Đang tải sân...
        </div>
      </div>
    );
  }

  return (
    <div className="booking-schedule-container">
      <div className="booking-schedule-scroll">
        <div className="booking-schedule-grid">
          <div className="booking-time-header">
            <div className="booking-court-header-cell"></div>
            {timeSlots.map((time) => (
              <div key={time} className="booking-time-cell">
                {time}
              </div>
            ))}
          </div>

          {grounds.map((ground) => (
            <div key={ground.groundId} className="booking-court-row">
              <div className="booking-court-label">{ground.name}</div>
              {timeSlots.map((time) => (
                <div
                  key={`${ground.groundId}-${time}`}
                  onClick={() => handleCellClick(ground.groundId, time)}
                  className={getCellClass(ground.groundId, time)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleGrid;
