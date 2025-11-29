const sportsVenues = [
  {
    id: 1,
    name: 'Cầu Lạc Bộ cầu lông cây da 1 (DEMO)',
    distance: '38.0m',
    address: '132 SG',
    time: '06:00 - 22:00',
    rating: 4,
    tags: ['Đơn ngay', 'Đơn tháng', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    name: 'CLB Cầu Lông TPT Sport - Làng đại học',
    distance: '1.8km',
    address: 'Đ. Tôn Thất Tùng, Đông Hòa, Dĩ An, Bình Dương',
    time: '06:00 - 22:00',
    rating: 4.9,
    tags: ['Đơn ngay', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    name: 'CN 09_CLB Pickleball Hoàng Thành Trung',
    distance: '2.2km',
    address: '449 Lê Văn Việt quận 9',
    time: '05:00 - 23:00',
    rating: 5,
    tags: ['Đơn ngay', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    name: 'NESTWORLD BADMINTON - PICKLEBALL',
    distance: '2.4km',
    address: '16 Đ. Số 385, Hiệp Phú, Thủ Đức, TP Hồ Chí Minh',
    time: '05:00 - 24:00',
    rating: 4.5,
    tags: ['Đơn ngay', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    name: 'Sân cầu lông Huế An',
    distance: '2.4km',
    address: 'Số 1 - Đường N17 - Phường Tăng Nhơn Phú A',
    time: '05:00 - 23:00',
    rating: 4,
    tags: ['Đơn ngay', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    name: 'Sân Bóng Tân Hòa',
    distance: '2.7km',
    address: 'Hẻm 05 Đình Tân Quý, Đường Tân Hòa',
    time: '05:00 - 24:00',
    tags: ['Đơn ngay', 'Đơn tháng'],
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop'
  },
  {
    id: 7,
    name: 'Black Panthers Pickleball Club',
    distance: '2.7km',
    address: '77/40 Tân Lập 2, Hiệp Phú, TP Thủ Đức',
    time: '05:00 - 22:00',
    rating: 5,
    tags: ['Đơn ngay', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop'
  },
  {
    id: 8,
    name: 'Sân cầu lông HiTa',
    distance: '2.7km',
    address: '44/8 Đường Hoàng Hữu Nam, Long Thạnh Mỹ',
    time: '05:00 - 24:00',
    rating: 5,
    tags: ['Đơn ngay', 'Sự kiện'],
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop'
  }
];
function getGrounds() {
  return sportsVenues;
}

export default getGrounds;