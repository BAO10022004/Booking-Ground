# DANH SÁCH TÍNH NĂNG VÀ API HỆ THỐNG

## 📋 CÁC TÍNH NĂNG CẦN THỰC HIỆN

### 1. ✅ Đăng nhập chỉ cho tài khoản User
**Trạng thái**: Đã sửa đổi
- **Mô tả**: Chỉ cho phép user (role = true/1, is_admin = false/0) đăng nhập, không cho admin/owner
- **File đã sửa**: 
  - `src/hooks/useAuth.ts`
- **Logic**: Kiểm tra `role` và `is_admin` sau khi login:
  - Cho phép: `role = true (1)` VÀ `is_admin = false (0)` → User thông thường
  - Từ chối: `role = false (0)` HOẶC `is_admin = true (1)` → Owner/Admin

### 2. ✅ CRUD Booking (Đầy đủ)
**Trạng thái**: Đã có service, cần hoàn thiện UI
- **Create**: ✅ Đã có `bookingService.createBooking()`
- **Read**: ✅ Đã có `bookingService.getMyBookings()` và `bookingService.getAllBookings()`
- **Update**: ✅ Đã có `bookingService.updateBooking()`
- **Delete**: ✅ Đã có `bookingService.deleteBooking()`
- **Cần thêm**: 
  - UI để Update booking (trong AccountPage/BookingsPage)
  - UI để Delete booking với confirmation
  - Xem chi tiết booking
  - Filter bookings theo status, date

### 3. ✅ Chức năng đăng xuất
**Trạng thái**: Đã có logic, cần thêm UI
- **Logic**: ✅ Đã có `authService.logout()` và `useAuth().logout()`
- **Cần thêm**: 
  - Nút đăng xuất trong AccountPage
  - Xác nhận trước khi đăng xuất (optional)

### 4. ✅ Chức năng đánh giá (Rating/Review)
**Trạng thái**: Đã có service, cần hoàn thiện UI
- **Service**: ✅ Đã có `ratingService` với đầy đủ CRUD
- **Cần thêm**:
  - Form để user tạo/sửa đánh giá trong VenueDetailModal (tab reviews)
  - Hiển thị danh sách đánh giá
  - Chỉ cho phép user đã booking mới được đánh giá
  - Hiển thị rating trung bình

### 5. ✅ Chức năng Search
**Trạng thái**: Đã có, sử dụng ThinkingSearch model
- **Hiện tại**: Sử dụng `ThinkingSearch` từ `src/utils/ThinkingSearch.tsx`
- **API**: `/predict` endpoint
- **Cần kiểm tra**: Xem có cần model riêng cho search hay không

### 6. ✅ Hiển thị dịch vụ sân dạng bảng
**Trạng thái**: Cần sửa đổi
- **File**: `src/components/VenueDetailModal.tsx` (tab services)
- **Hiện tại**: Hiển thị dạng list/card
- **Cần sửa**: Chuyển sang hiển thị dạng bảng (table) với các cột:
  - Tên dịch vụ
  - Giá sỉ (wholesale)
  - Đơn vị sỉ
  - Giá lẻ (retail)
  - Đơn vị lẻ

---

## 🔧 CÁC TÍNH NĂNG KHÁC CẦN CÓ

### 7. Quản lý Profile User
- Xem thông tin cá nhân
- Cập nhật thông tin (tên, email, số điện thoại, avatar)
- Đổi mật khẩu

### 8. Lịch sử Booking
- Xem tất cả booking đã đặt
- Filter theo trạng thái (Pending, Confirmed, Cancelled, Completed)
- Filter theo ngày
- Xem chi tiết booking

### 9. Thanh toán (Payment)
- Xem lịch sử thanh toán
- Tích hợp thanh toán online (nếu có)
- Xem hóa đơn

### 10. Thông báo (Notifications)
- Thông báo booking được xác nhận
- Thông báo booking bị hủy
- Thông báo thanh toán
- Thông báo khuyến mãi

### 11. Khuyến mãi (Promotions)
- Xem danh sách khuyến mãi
- Áp dụng mã giảm giá
- Lịch sử sử dụng khuyến mãi

### 12. Sự kiện (Events)
- Xem danh sách sự kiện
- Đăng ký tham gia sự kiện
- Xem chi tiết sự kiện

### 13. Bộ lọc nâng cao
- Lọc theo khoảng giá
- Lọc theo khoảng cách
- Lọc theo đánh giá
- Lọc theo tiện ích

### 14. Bản đồ (Map)
- Hiển thị sân trên bản đồ
- Tìm đường đến sân
- Xem vị trí sân

### 15. Yêu thích (Favorites)
- Thêm/xóa sân yêu thích
- Xem danh sách sân yêu thích

### 16. Chia sẻ
- Chia sẻ sân lên mạng xã hội
- Chia sẻ link booking

### 17. Đánh giá và phản hồi
- Đánh giá sân sau khi sử dụng
- Phản hồi về dịch vụ

### 18. Hỗ trợ khách hàng
- Chat với chủ sân
- Gửi yêu cầu hỗ trợ
- FAQ

---

## 🌐 TOÀN BỘ API HỆ THỐNG SẼ SỬ DỤNG

### 🔐 AUTHENTICATION APIs

| Method | Endpoint             | Mô tả                       | Request Body                                                                       | Response                                                 |
| ------ | -------------------- | --------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- |
| POST   | `/api/auth/register` | Đăng ký tài khoản mới       | `{ phone_number, email, name, password, password_confirmation, gender, birthday }` | `{ user, access_token }`                                 |
| POST   | `/api/auth/login`    | Đăng nhập                   | `{ email/phone, password }`                                                        | `{ user, access_token }`                                 |
| POST   | `/api/auth/logout`   | Đăng xuất                   | -                                                                                  | `{ message }`                                            |
| GET    | `/api/auth/me`       | Lấy thông tin user hiện tại | -                                                                                  | `{ id, name, email, phone_number, role, is_admin, ... }` |

### 🏟️ VENUE APIs

| Method | Endpoint                          | Mô tả                  | Query Params                                | Response            |
| ------ | --------------------------------- | ---------------------- | ------------------------------------------- | ------------------- |
| GET    | `/api/venues`                     | Lấy danh sách sân      | `category_id?, city?, district?, search?`   | `{ data: Venue[] }` |
| GET    | `/api/venues/:id`                 | Lấy chi tiết sân       | -                                           | `Venue`             |
| GET    | `/api/venues/:id/services`        | Lấy dịch vụ của sân    | -                                           | `ServiceList[]`     |
| GET    | `/api/venues/:id/terms`           | Lấy điều khoản của sân | -                                           | `Term[]`            |
| GET    | `/api/venues/:id/price-lists`     | Lấy bảng giá của sân   | -                                           | `PriceList[]`       |
| GET    | `/api/venues/:id/images`          | Lấy hình ảnh của sân   | `is_layout?`                                | `Image[]`           |
| GET    | `/api/venues/:id/schedule`        | Lấy lịch trình của sân | `date?`                                     | `Schedule`          |
| POST   | `/api/venues/:id/calculate-price` | Tính giá booking       | `{ date, start_time, end_time, ground_id }` | `{ price }`         |

### 📅 BOOKING APIs

| Method | Endpoint                    | Mô tả                         | Request Body                                                                                          | Query Params                          | Response              |
| ------ | --------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------- | --------------------- |
| GET    | `/api/bookings`             | Lấy danh sách booking         | -                                                                                                     | `user_id?, venue_id?, date?, status?` | `{ data: Booking[] }` |
| GET    | `/api/bookings/my-bookings` | Lấy booking của user hiện tại | -                                                                                                     | -                                     | `{ data: Booking[] }` |
| GET    | `/api/bookings/:id`         | Lấy chi tiết booking          | -                                                                                                     | -                                     | `Booking`             |
| POST   | `/api/bookings`             | Tạo booking mới               | `{ date, start_time, end_time, ground_id, is_event?, event_id?, target?, customer_note?, quantity? }` | -                                     | `Booking`             |
| PUT    | `/api/bookings/:id`         | Cập nhật booking              | `{ date?, start_time?, end_time?, ground_id?, customer_note?, quantity? }`                            | -                                     | `Booking`             |
| DELETE | `/api/bookings/:id`         | Xóa booking                   | -                                                                                                     | -                                     | `{ message }`         |

### ⭐ RATING APIs

| Method | Endpoint           | Mô tả                  | Request Body                         | Query Params          | Response             |
| ------ | ------------------ | ---------------------- | ------------------------------------ | --------------------- | -------------------- |
| GET    | `/api/ratings`     | Lấy danh sách đánh giá | -                                    | `venue_id?, user_id?` | `{ data: Rating[] }` |
| GET    | `/api/ratings/:id` | Lấy chi tiết đánh giá  | -                                    | -                     | `Rating`             |
| POST   | `/api/ratings`     | Tạo đánh giá mới       | `{ venue_id, star_number, review? }` | -                     | `Rating`             |
| PUT    | `/api/ratings/:id` | Cập nhật đánh giá      | `{ star_number?, review? }`          | -                     | `Rating`             |
| DELETE | `/api/ratings/:id` | Xóa đánh giá           | -                                    | -                     | `{ message }`        |

### 💰 PAYMENT APIs

| Method | Endpoint                    | Mô tả                    | Request Body                                        | Query Params  | Response              |
| ------ | --------------------------- | ------------------------ | --------------------------------------------------- | ------------- | --------------------- |
| GET    | `/api/payments`             | Lấy danh sách thanh toán | -                                                   | `booking_id?` | `{ data: Payment[] }` |
| GET    | `/api/payments/my-payments` | Lấy thanh toán của user  | -                                                   | -             | `{ data: Payment[] }` |
| GET    | `/api/payments/:id`         | Lấy chi tiết thanh toán  | -                                                   | -             | `Payment`             |
| POST   | `/api/payments`             | Tạo thanh toán           | `{ booking_id, amount, unit_price, method, note? }` | -             | `Payment`             |
| PUT    | `/api/payments/:id`         | Cập nhật thanh toán      | `{ amount?, method?, status? }`                     | -             | `Payment`             |

### 🏷️ CATEGORY APIs

| Method | Endpoint              | Mô tả                  | Query Params | Response               |
| ------ | --------------------- | ---------------------- | ------------ | ---------------------- |
| GET    | `/api/categories`     | Lấy danh sách danh mục | -            | `{ data: Category[] }` |
| GET    | `/api/categories/:id` | Lấy chi tiết danh mục  | -            | `Category`             |

### ⚽ GROUND APIs

| Method | Endpoint           | Mô tả                 | Query Params              | Response             |
| ------ | ------------------ | --------------------- | ------------------------- | -------------------- |
| GET    | `/api/grounds`     | Lấy danh sách sân con | `venue_id?, category_id?` | `{ data: Ground[] }` |
| GET    | `/api/grounds/:id` | Lấy chi tiết sân con  | -                         | `Ground`             |

### 🎉 EVENT APIs

| Method | Endpoint          | Mô tả                 | Query Params | Response            |
| ------ | ----------------- | --------------------- | ------------ | ------------------- |
| GET    | `/api/events`     | Lấy danh sách sự kiện | `venue_id?`  | `{ data: Event[] }` |
| GET    | `/api/events/:id` | Lấy chi tiết sự kiện  | -            | `Event`             |

### 🖼️ IMAGE APIs

| Method | Endpoint             | Mô tả           | Request Body               | Response      |
| ------ | -------------------- | --------------- | -------------------------- | ------------- |
| POST   | `/api/images/upload` | Upload hình ảnh | `FormData: { file, name }` | `Image`       |
| GET    | `/api/images/:id`    | Lấy hình ảnh    | -                          | `Image`       |
| DELETE | `/api/images/:id`    | Xóa hình ảnh    | -                          | `{ message }` |

### 🔍 SEARCH APIs

| Method | Endpoint       | Mô tả           | Request Body        | Response                  |
| ------ | -------------- | --------------- | ------------------- | ------------------------- |
| POST   | `/api/predict` | Thinking Search | `{ query: string }` | `{ venue_ids: string[] }` |

---

## 📊 DATA MODELS

### User Model
```typescript
{
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: boolean;
  birthday: string;
  role: boolean; // true (1) = user, false (0) = owner
  is_admin: boolean;
  is_active: boolean;
  avatar_id?: string;
  cover_image_id?: string;
}
```

### Venue Model
```typescript
{
  id: string;
  name: string;
  address: string;
  sub_address?: string;
  district?: string;
  city?: string;
  operating_time?: string;
  phone_number1?: string;
  phone_number2?: string;
  website?: string;
  deposit?: number;
  owner?: { id, name };
  categories?: Array<{ id, name }>;
  images?: Array<{ id, name, image_url }>;
  grounds?: Array<{ id, name, venue_id, category_id }>;
}
```

### Booking Model
```typescript
{
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  amount_time: number;
  is_event: boolean;
  ground_id: string;
  target?: string;
  customer_note?: string;
  owner_note?: string;
  quantity: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  event_id?: string | null;
  ground?: { id, name, venue_id };
  user?: { id, name, email };
}
```

### Rating Model
```typescript
{
  id?: string;
  user_id: string;
  venue_id: string;
  star_number: number; // 1-5
  review?: string;
  created_at?: string;
  user?: { id, name, email, phone_number, avatar };
  venue?: { id, name };
}
```

### ServiceList Model
```typescript
{
  id: string;
  name: string;
  venue_id?: string;
  details: Array<{
    id: string;
    name: string;
    wholesale: string;
    unit_wholesale: string;
    retail: string;
    unit_retail: string;
  }>;
}
```

---

## 🎯 ƯU TIÊN THỰC HIỆN

### Priority 1 (Bắt buộc)
1. ✅ Đăng nhập chỉ cho user
2. ✅ CRUD Booking đầy đủ
3. ✅ Đăng xuất
4. ✅ Đánh giá
5. ✅ Hiển thị dịch vụ dạng bảng

### Priority 2 (Quan trọng)
6. Quản lý Profile
7. Lịch sử Booking với filter
8. Thanh toán cơ bản
9. Thông báo

### Priority 3 (Nâng cao)
10. Khuyến mãi
11. Sự kiện
12. Bộ lọc nâng cao
13. Yêu thích
14. Chia sẻ

---

## 📝 GHI CHÚ

- Tất cả API đều yêu cầu authentication token (trừ register/login)
- Token được lưu trong localStorage với key `auth_token`
- Response format có thể là `{ data: ... }` hoặc trực tiếp data
- Tất cả dates sử dụng format `YYYY-MM-DD`
- Tất cả times sử dụng format `HH:mm` (24h format)

