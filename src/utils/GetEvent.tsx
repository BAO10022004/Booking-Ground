import { Event } from "../models/Event";

export const eventsData: Event[] = [

  // ===== VENUE 1 – Cây Da =====
  new Event({
    groundId: 'g-132sg-001-E',
    name: "Giao Lưu Mở Rộng Cầu Lông Cây Da",
    price: 50000,
    ticketNumber: 50,
    level: "Trung cấp"
  }),

  new Event({
    groundId: 'g-132sg-001-E',
    name: "Cây Da Badminton Mini Tournament",
    price: 70000,
    ticketNumber: 80,
    level: "Nghiệp dư"
  }),

  // ===== VENUE 2 – TPT Sport =====
  new Event({
    groundId: 'g-tpt-ldh-002-2',
    name: "TPT Sport Doubles Cup",
    price: 80000,
    ticketNumber: 120,
    level: "Nghiệp dư"
  }),

  new Event({
    groundId: 'g-tpt-ldh-002-3',
    name: "TPT League – Giải Đơn Nam",
    price: 60000,
    ticketNumber: 60,
    level: "Trung cấp"
  }),

  new Event({
    groundId: 'g-tpt-ldh-002-3',
    name: "TPT Master Series",
    price: 95000,
    ticketNumber: 90,
    level: "Chuyên nghiệp"
  }),

  // ===== VENUE 3 – Pickleball Hoàng Thành =====
  new Event({
    groundId: 'g-pbht-003-P1',
    name: "Pickleball Beginner Workshop",
    price: 40000,
    ticketNumber: 30,
    level: "Cơ bản"
  }),

  // ===== VENUE 4 – NESTWORLD =====
  new Event({
    groundId: 'g-nest-004-EV',
    name: "NestWorld Pickleball Championship",
    price: 120000,
    ticketNumber: 200,
    level: "Chuyên nghiệp"
  }),

  new Event({
    groundId: 'g-nest-004-EV',
    name: "NestWorld Open – Giải Trẻ",
    price: 60000,
    ticketNumber: 150,
    level: "Cơ bản"
  }),

  // ===== VENUE 5 – Huế An =====
  new Event({
    groundId: 'g-hua-005-2',
    name: "Giải Đôi Nam Nữ CLB Huế An",
    price: 45000,
    ticketNumber: 60,
    level: "Trung cấp"
  }),

  // ===== VENUE 6 – Tân Hòa Football =====
  new Event({
    groundId: 'g-tanhoa-006-F7',
    name: "Giải Bóng Đá Tân Hòa Mở Rộng 7v7",
    price: 150000,
    ticketNumber: 300,
    level: "Phong trào"
  }),

  // ===== VENUE 7 – Black Panthers =====
  new Event({
    groundId: 'g-bpb-007-E',
    name: "Black Panthers Pickleball Cup",
    price: 90000,
    ticketNumber: 150,
    level: "Chuyên nghiệp"
  }),

  new Event({
    groundId: 'g-bpb-007-E',
    name: "Black Panthers Juniors Tournament",
    price: 70000,
    ticketNumber: 100,
    level: "Trẻ"
  }),

  // ===== VENUE 8 – HITA =====
  new Event({
    groundId: 'g-hita-008-2',
    name: "HITA Badminton Challenge",
    price: 60000,
    ticketNumber: 70,
    level: "Trung cấp"
  }),

  new Event({
    groundId: 'g-hita-008-2',
    name: "HITA Open Cup – Mùa Xuân",
    price: 85000,
    ticketNumber: 120,
    level: "Nghiệp dư"
  }),
];
export function hasEvent(groundId: string): boolean {
  return eventsData.some(e => e.groundId === groundId);
}
export function getEventsByGround(groundId: string): Event[] {
  return eventsData.filter(e => e.groundId === groundId);
}
