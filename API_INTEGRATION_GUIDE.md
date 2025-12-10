# Hướng Dẫn Tích Hợp API

## Tổng Quan

Dự án đã được tích hợp với Laravel API backend. Tất cả các service functions đã được tạo sẵn để kết nối với API.

## Cấu Hình

### 1. Tạo file `.env`

Tạo file `.env` trong thư mục gốc của project với nội dung:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Lưu ý**: Thay đổi URL nếu backend chạy ở port khác hoặc domain khác.

### 2. Khởi Động Backend

Đảm bảo Laravel backend đang chạy:

```bash
# Trong thư mục Laravel backend
php artisan serve
```

Backend sẽ chạy tại: `http://localhost:8000`

## Sử Dụng API Services

### Authentication

```typescript
import { authService } from './services';

// Đăng ký
const registerData = {
  phone_number: '0123456789',
  email: 'user@example.com',
  name: 'John Doe',
  password: 'password123',
  password_confirmation: 'password123',
  gender: true,
  birthday: '1990-01-01'
};

const authResponse = await authService.register(registerData);
console.log('Token:', authResponse.token);

// Đăng nhập
const loginData = {
  email: 'user@example.com',
  password: 'password123'
};

const loginResponse = await authService.login(loginData);

// Lấy thông tin user hiện tại
const currentUser = await authService.getCurrentUser();

// Đăng xuất
await authService.logout();

// Kiểm tra đã đăng nhập chưa
const isAuth = authService.isAuthenticated();
```

### Venues

```typescript
import { venueService } from './services';

// Lấy tất cả venues
const venues = await venueService.getAllVenues();

// Lấy venues với filter
const filteredVenues = await venueService.getAllVenues({
  category_id: 'uuid',
  city: 'TP Hồ Chí Minh',
  search: 'cầu lông'
});

// Lấy venue theo ID
const venue = await venueService.getVenueById('venue-uuid');
```

### Bookings

```typescript
import { bookingService } from './services';

// Lấy tất cả bookings của user hiện tại
const myBookings = await bookingService.getMyBookings();

// Tạo booking mới
const newBooking = await bookingService.createBooking({
  date: '2025-12-15',
  start_time: '10:00',
  end_time: '12:00',
  ground_id: 'ground-uuid',
  is_event: false,
  event_id: null,
  target: 'Students',
  customer_note: 'Please prepare the court',
  quantity: 4
});

// Cập nhật booking
await bookingService.updateBooking('booking-uuid', {
  customer_note: 'Updated note'
});

// Xóa booking
await bookingService.deleteBooking('booking-uuid');
```

### Categories

```typescript
import { categoryService } from './services';

const categories = await categoryService.getAllCategories();
```

### Grounds

```typescript
import { groundService } from './services';

// Lấy tất cả grounds
const allGrounds = await groundService.getAllGrounds();

// Lấy grounds theo venue
const venueGrounds = await groundService.getAllGrounds({
  venue_id: 'venue-uuid'
});
```

### Payments

```typescript
import { paymentService } from './services';

// Lấy payments của user hiện tại
const payments = await paymentService.getMyPayments();

// Tạo payment
const payment = await paymentService.createPayment({
  booking_id: 'booking-uuid',
  amount: 100.00,
  unit_price: 50.00,
  method: 'Online',
  note: 'Payment note'
});
```

### Ratings

```typescript
import { ratingService } from './services';

// Lấy tất cả ratings
const allRatings = await ratingService.getAllRatings();

// Lấy ratings theo venue
const venueRatings = await ratingService.getAllRatings({
  venue_id: 'venue-uuid'
});

// Tạo rating
const rating = await ratingService.createRating({
  venue_id: 'venue-uuid',
  star_number: 5,
  review: 'Great venue!'
});

// Cập nhật rating
await ratingService.updateRating('rating-id', {
  star_number: 4,
  review: 'Updated review'
});

// Xóa rating
await ratingService.deleteRating('rating-id');
```

### Events

```typescript
import { eventService } from './services';

const events = await eventService.getAllEvents();
```

### Images

```typescript
import { imageService } from './services';

// Upload image
const file = event.target.files[0];
const image = await imageService.uploadImage(file, 'Image Name');

// Lấy image
const imageData = await imageService.getImage('image-uuid');

// Xóa image
await imageService.deleteImage('image-uuid');
```

## Các Utility Functions Đã Được Cập Nhật

Các utility functions trong thư mục `src/utils/` đã được cập nhật để sử dụng API thật:

- `getVenues.tsx` - Lấy danh sách venues từ API
- `getCategory.tsx` - Lấy danh sách categories từ API
- `GetGround.tsx` - Lấy grounds từ API
- `GetEvent.tsx` - Lấy events từ API
- `get_account.tsx` - Lấy thông tin user từ API

**Lưu ý**: Các functions này giờ là async, cần sử dụng `await` khi gọi.

## Xử Lý Lỗi

Tất cả các service functions đều có try-catch và sẽ log lỗi ra console. Bạn có thể thêm error handling tùy chỉnh:

```typescript
try {
  const venues = await venueService.getAllVenues();
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message);
    // Hiển thị thông báo lỗi cho user
  }
}
```

## Token Management

Token được tự động lưu vào `localStorage` khi đăng nhập/đăng ký và tự động được thêm vào header của mọi request.

Token sẽ được xóa khi:
- Gọi `authService.logout()`
- User xóa localStorage

## CORS Configuration

Nếu gặp lỗi CORS, cần cấu hình trong Laravel backend:

1. Mở file `config/cors.php`
2. Đảm bảo `allowed_origins` bao gồm domain của frontend
3. Hoặc sử dụng middleware CORS phù hợp

## Testing

Để test API integration:

1. Khởi động Laravel backend: `php artisan serve`
2. Khởi động frontend: `npm run dev`
3. Mở browser và kiểm tra Network tab để xem các API calls

## Troubleshooting

### Lỗi: "Network request failed"
- Kiểm tra backend có đang chạy không
- Kiểm tra `VITE_API_BASE_URL` trong `.env` có đúng không
- Kiểm tra CORS configuration

### Lỗi: "401 Unauthorized"
- Kiểm tra token có được lưu trong localStorage không
- Thử đăng nhập lại để lấy token mới

### Lỗi: "404 Not Found"
- Kiểm tra API endpoint có đúng không
- Kiểm tra routes trong Laravel backend

