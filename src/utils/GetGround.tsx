import Ground from '../models/Ground'; // Giả sử lớp Ground nằm trong file Ground.ts
const groundsData: Ground[] = [
  // --- VENUE 1: Cầu Lạc Bộ cầu lông cây da 1 (v-132sg-001) ---
  new Ground({ 
    groundId: 'g-132sg-001-A', 
    name: 'Sân A', 
    venueId: 'v-132sg-001', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-132sg-001-B', 
    name: 'Sân B', 
    venueId: 'v-132sg-001', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-132sg-001-E', 
    name: 'Sân Event', 
    venueId: 'v-132sg-001', 
    categoryId: '2' // Dành cho đặt lịch sự kiện
  }),

  // --- VENUE 2: CLB Cầu Lông TPT Sport (v-tpt-ldh-002) ---
  new Ground({ 
    groundId: 'g-tpt-ldh-002-1', 
    name: 'Sân 1', 
    venueId: 'v-tpt-ldh-002', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-tpt-ldh-002-2', 
    name: 'Sân 2', 
    venueId: 'v-tpt-ldh-002', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-tpt-ldh-002-3', 
    name: 'Sân 3', 
    venueId: 'v-tpt-ldh-002', 
    categoryId: '1' 
  }),

  // --- VENUE 3: CLB Pickleball Hoàng Thành Trung (v-pbht-003) ---
  new Ground({ 
    groundId: 'g-pbht-003-P1', 
    name: 'Pickle 1', 
    venueId: 'v-pbht-003', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-pbht-003-P2', 
    name: 'Pickle 2', 
    venueId: 'v-pbht-003', 
    categoryId: '1' 
  }),

  // --- VENUE 4: NESTWORLD BADMINTON - PICKLEBALL (v-nest-004) ---
  new Ground({ 
    groundId: 'g-nest-004-B1', 
    name: 'Badminton 1', 
    venueId: 'v-nest-004', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-nest-004-B2', 
    name: 'Badminton 2', 
    venueId: 'v-nest-004', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-nest-004-EV', 
    name: 'Event Hall', 
    venueId: 'v-nest-004', 
    categoryId: '2' 
  }),

  // --- VENUE 5: Sân cầu lông Huế An (v-hua-005) ---
  new Ground({ 
    groundId: 'g-hua-005-1', 
    name: 'Sân 1 (Đơn)', 
    venueId: 'v-hua-005', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-hua-005-2', 
    name: 'Sân 2 (Đôi)', 
    venueId: 'v-hua-005', 
    categoryId: '1' 
  }),

  // --- VENUE 6: Sân Bóng Tân Hòa (v-tanhoa-006) ---
  new Ground({ 
    groundId: 'g-tanhoa-006-F5', 
    name: 'Sân Futsal 5v5', 
    venueId: 'v-tanhoa-006', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-tanhoa-006-F7', 
    name: 'Sân Cỏ 7v7', 
    venueId: 'v-tanhoa-006', 
    categoryId: '1' 
  }),

  // --- VENUE 7: Black Panthers Pickleball Club (v-bpb-007) ---
  new Ground({ 
    groundId: 'g-bpb-007-G1', 
    name: 'Ground 1', 
    venueId: 'v-bpb-007', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-bpb-007-G2', 
    name: 'Ground 2', 
    venueId: 'v-bpb-007', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-bpb-007-E', 
    name: 'Tournament Court', 
    venueId: 'v-bpb-007', 
    categoryId: '2' 
  }),

  // --- VENUE 8: Sân cầu lông HiTa (v-hita-008) ---
  new Ground({ 
    groundId: 'g-hita-008-1', 
    name: 'Sân 1', 
    venueId: 'v-hita-008', 
    categoryId: '1' 
  }),
  new Ground({ 
    groundId: 'g-hita-008-2', 
    name: 'Sân 2', 
    venueId: 'v-hita-008', 
    categoryId: '1' 
  }),
];

function GetGroundByVenue(venueId: string ){
    const groundsDataFiltered = groundsData.filter(ground => 
        ground.venueId === venueId
    );
    return groundsDataFiltered;
}

export default GetGroundByVenue;