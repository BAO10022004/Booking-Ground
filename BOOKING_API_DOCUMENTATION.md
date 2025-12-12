# Booking API Documentation

Tài liệu này mô tả các API cần thiết cho hệ thống đặt sân.

## 1. Lấy lịch đặt sân (Schedule Availability)

### Endpoint
```
GET /api/venues/{venueId}/schedule
```

### Query Parameters
- `date` (required): Ngày cần lấy lịch, format: `YYYY-MM-DD` (ví dụ: `2025-12-12`)
- `category_id` (optional): ID của category/đối tượng (ví dụ: "Học sinh - sinh viên", "Người Lớn")

### Response
```json
{
  "booked": ["A-8:00", "A-8:30", "B-10:00"],
  "locked": ["A-6:00", "A-6:30"],
  "events": ["C-14:00", "C-14:30"]
}
```

### Format của slots
- Format: `{groundId}-{timeSlot}` (ví dụ: `A-8:00`, `B-10:30`)
- `groundId`: ID hoặc tên của sân (A, B, C, ...)
- `timeSlot`: Khung giờ, format: `HH:mm` (ví dụ: `8:00`, `10:30`)

### Mô tả
- `booked`: Danh sách các slot đã được đặt (hiển thị màu đỏ)
- `locked`: Danh sách các slot bị khóa (không cho đặt)
- `events`: Danh sách các slot dành cho sự kiện (hiển thị màu khác)

---

## 2. Tính giá đặt sân (Price Calculation)

### Endpoint
```
POST /api/venues/{venueId}/calculate-price
```

### Request Body
```json
{
  "date": "2025-12-12",
  "startTime": "11:00",
  "endTime": "12:30",
  "groundId": "A",
  "categoryId": "category-id-123",
  "target": "Học sinh - sinh viên"
}
```

### Response
```json
{
  "totalPrice": 60000,
  "totalHours": 1.5
}
```

### Mô tả
- `totalPrice`: Tổng giá tiền (VND)
- `totalHours`: Tổng số giờ (có thể là số thập phân, ví dụ: 1.5 = 1 giờ 30 phút)

---

## 3. Tạo booking (Create Booking)

### Endpoint
```
POST /api/bookings
```

### Request Body
```json
{
  "date": "2025-12-12",
  "start_time": "11:00:00",
  "end_time": "12:30:00",
  "ground_id": "ground-id-123",
  "is_event": false,
  "target": "Học sinh - sinh viên",
  "customer_note": "Ghi chú của khách hàng",
  "quantity": 1
}
```

### Response
```json
{
  "id": "booking-id-123",
  "user_id": "user-id-123",
  "date": "2025-12-12",
  "start_time": "11:00:00",
  "end_time": "12:30:00",
  "amount_time": 1.5,
  "ground_id": "ground-id-123",
  "target": "Học sinh - sinh viên",
  "customer_note": "Ghi chú của khách hàng",
  "status": "pending",
  "quantity": 1
}
```

---

## 4. Lấy danh sách categories của venue

### Endpoint
```
GET /api/venues/{venueId}
```

### Response (phần categories)
```json
{
  "id": "venue-id-123",
  "name": "CLB Cầu Lông TPT Sport",
  "categories": [
    {
      "id": "category-id-1",
      "name": "Học sinh - sinh viên"
    },
    {
      "id": "category-id-2",
      "name": "Người Lớn"
    }
  ]
}
```

---

## 5. Lấy thông tin booking

### Endpoint
```
GET /api/bookings/{bookingId}
```

### Response
```json
{
  "id": "booking-id-123",
  "user_id": "user-id-123",
  "date": "2025-12-12",
  "start_time": "11:00:00",
  "end_time": "12:30:00",
  "amount_time": 1.5,
  "ground_id": "ground-id-123",
  "target": "Học sinh - sinh viên",
  "customer_note": "Ghi chú của khách hàng",
  "status": "pending",
  "ground": {
    "id": "ground-id-123",
    "name": "Sân A",
    "venue_id": "venue-id-123"
  }
}
```

---

## Flow đặt sân

1. **Chọn venue** → User click "ĐẶT LỊCH" trên venue card
2. **Chọn hình thức đặt** → Modal hiển thị 2 options:
   - Đặt lịch ngày trực quan
   - Đặt lịch sự kiện
3. **Chọn đối tượng** → Modal hiển thị categories (Học sinh - sinh viên / Người Lớn)
4. **Chọn ngày và khung giờ** → Schedule grid với booked/locked/available slots
5. **Tính giá** → API calculate-price được gọi khi user chọn slots
6. **Xác nhận booking** → Form nhập thông tin (tên, SĐT, ghi chú)
7. **Tạo booking** → API create booking được gọi
8. **Trang xác nhận** → Hiển thị thông tin booking đã tạo

---

## Notes

- Tất cả các API cần authentication token (trừ một số public endpoints)
- Time format: `HH:mm:ss` cho API, `HH:mm` cho display
- Date format: `YYYY-MM-DD` cho API
- Price được tính dựa trên:
  - Category/Target (Học sinh vs Người lớn)
  - Time slots (có thể có giá khác nhau theo khung giờ)
  - Ground (sân khác nhau có thể có giá khác nhau)
