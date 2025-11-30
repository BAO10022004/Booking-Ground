// Giả định đây là lớp Venue đã được import hoặc định nghĩa ở đâu đó
/*
class Venue {
  readonly venueId: string; 
  name: string; 
  subAddress: string; 
  district: string; 
  city: string; 
  address: string; 
  operatingTime: string; 
  phoneNumber1: string; 
  phoneNumber2: string | null; 
  website: string | null; 
  deposit: number; 
  ownerId: string; 
  // ... constructor
}
*/

const sportsVenues = [
  {
    // Chuyển đổi ID sang string (Guid) và khớp với Venue
    venueId: 'v-132sg-001', 
    name: 'Cầu Lạc Bộ cầu lông cây da 1 (DEMO)',
    // Dữ liệu cũ: distance: '38.0m', (Không có trong Venue Class, bỏ qua)
    
    // Tách Address thành các trường chi tiết
    subAddress: '132',
    district: 'Quận 9',
    city: 'TP Hồ Chí Minh',
    address: '132 SG, Quận 9, TP Hồ Chí Minh',
    
    operatingTime: '06:00 - 22:00',
    phoneNumber1: '0901234567', // Giả định
    phoneNumber2: null,
    website: null,
    deposit: 5, // Giả định 5%
    ownerId: 'u-owner-001', // Giả định ID chủ sở hữu
    
    // Dữ liệu cũ: rating: 4, tags: ['Đơn ngay', 'Đơn tháng', 'Sự kiện'], (Không có trong Venue Class, bỏ qua)
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-tpt-ldh-002', 
    name: 'CLB Cầu Lông TPT Sport - Làng đại học',
    subAddress: 'Đ. Tôn Thất Tùng',
    district: 'Dĩ An',
    city: 'Bình Dương',
    address: 'Đ. Tôn Thất Tùng, Đông Hòa, Dĩ An, Bình Dương',
    operatingTime: '06:00 - 22:00',
    phoneNumber1: '0901234568',
    phoneNumber2: '0901234569',
    website: 'https://tptsport.vn',
    deposit: 10,
    ownerId: 'u-owner-002',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-pbht-003',
    name: 'CN 09_CLB Pickleball Hoàng Thành Trung',
    subAddress: '449 Lê Văn Việt',
    district: 'Quận 9',
    city: 'TP Hồ Chí Minh',
    address: '449 Lê Văn Việt quận 9',
    operatingTime: '05:00 - 23:00',
    phoneNumber1: '0901234570',
    phoneNumber2: null,
    website: null,
    deposit: 0,
    ownerId: 'u-owner-003',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-nest-004',
    name: 'NESTWORLD BADMINTON - PICKLEBALL',
    subAddress: '16 Đ. Số 385',
    district: 'Thủ Đức',
    city: 'TP Hồ Chí Minh',
    address: '16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP Hồ Chí Minh',
    operatingTime: '05:00 - 24:00',
    phoneNumber1: '0901234571',
    phoneNumber2: null,
    website: null,
    deposit: 15,
    ownerId: 'u-owner-004',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-hua-005',
    name: 'Sân cầu lông Huế An',
    subAddress: 'Số 1 - Đường N17',
    district: 'Thủ Đức',
    city: 'TP Hồ Chí Minh',
    address: 'Số 1 - Đường N17 - Phường Tăng Nhơn Phú A',
    operatingTime: '05:00 - 23:00',
    phoneNumber1: '0901234572',
    phoneNumber2: null,
    website: null,
    deposit: 10,
    ownerId: 'u-owner-005',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-tanhoa-006',
    name: 'Sân Bóng Tân Hòa',
    subAddress: 'Hẻm 05 Đình Tân Quý',
    district: 'Tân Phú',
    city: 'TP Hồ Chí Minh',
    address: 'Hẻm 05 Đình Tân Quý, Đường Tân Hòa',
    operatingTime: '05:00 - 24:00',
    phoneNumber1: '0901234573',
    phoneNumber2: null,
    website: null,
    deposit: 0,
    ownerId: 'u-owner-006',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-bpb-007',
    name: 'Black Panthers Pickleball Club',
    subAddress: '77/40 Tân Lập 2',
    district: 'Thủ Đức',
    city: 'TP Hồ Chí Minh',
    address: '77/40 Tân Lập 2, Hiệp Phú, TP Thủ Đức',
    operatingTime: '05:00 - 22:00',
    phoneNumber1: '0901234574',
    phoneNumber2: null,
    website: 'https://blackpanthers.com',
    deposit: 20,
    ownerId: 'u-owner-007',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop'
  },
  {
    venueId: 'v-hita-008',
    name: 'Sân cầu lông HiTa',
    subAddress: '44/8 Đường Hoàng Hữu Nam',
    district: 'Quận 9',
    city: 'TP Hồ Chí Minh',
    address: '44/8 Đường Hoàng Hữu Nam, Long Thạnh Mỹ',
    operatingTime: '05:00 - 24:00',
    phoneNumber1: '0901234575',
    phoneNumber2: null,
    website: null,
    deposit: 10,
    ownerId: 'u-owner-008',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  }
];

function getGrounds() {
  // Trong ứng dụng thực tế, bạn sẽ tạo instance của Venue Class ở đây
  /* return sportsVenues.map(data => new Venue(data as any)); 
  */
  return sportsVenues;
}

export default getGrounds;