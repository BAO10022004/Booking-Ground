

/**
 * Dữ liệu mẫu cho ServiceList (Danh sách dịch vụ theo venue)
 */
const serviceListsData = [
  {
    ServiceListID: 'sl-v-132sg-001-001',
    Name: 'Đồ uống & Nước giải khát',
    VenueID: 'v-132sg-001'
  },
  {
    ServiceListID: 'sl-v-132sg-001-002',
    Name: 'Thuê vợt & Phụ kiện',
    VenueID: 'v-132sg-001'
  },
  {
    ServiceListID: 'sl-v-tpt-ldh-002-001',
    Name: 'Nước uống',
    VenueID: 'v-tpt-ldh-002'
  },
  {
    ServiceListID: 'sl-v-tpt-ldh-002-002',
    Name: 'Dịch vụ cho thuê',
    VenueID: 'v-tpt-ldh-002'
  },
  {
    ServiceListID: 'sl-v-pbht-003-001',
    Name: 'Đồ uống giải khát',
    VenueID: 'v-pbht-003'
  },
  {
    ServiceListID: 'sl-v-nest-004-001',
    Name: 'Nước giải khát',
    VenueID: 'v-nest-004'
  },
  {
    ServiceListID: 'sl-v-nest-004-002',
    Name: 'Cho thuê dụng cụ',
    VenueID: 'v-nest-004'
  },
  {
    ServiceListID: 'sl-v-hua-005-001',
    Name: 'Dịch vụ ăn uống',
    VenueID: 'v-hua-005'
  },
  {
    ServiceListID: 'sl-v-tanhoa-006-001',
    Name: 'Nước uống',
    VenueID: 'v-tanhoa-006'
  },
  {
    ServiceListID: 'sl-v-bpb-007-001',
    Name: 'Đồ uống cao cấp',
    VenueID: 'v-bpb-007'
  },
  {
    ServiceListID: 'sl-v-bpb-007-002',
    Name: 'Thuê vợt Pickleball',
    VenueID: 'v-bpb-007'
  },
  {
    ServiceListID: 'sl-v-hita-008-001',
    Name: 'Nước giải khát',
    VenueID: 'v-hita-008'
  }
];

/**
 * Dữ liệu mẫu cho ServiceListDetails (Chi tiết dịch vụ)
 */
const serviceListDetailsData = [
  // Đồ uống & Nước giải khát - Venue 001
  {
    serviceListDetailID: 'sld-001-001',
    name: 'Nước suối Lavie',
    wholesale: '50.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '5.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-132sg-001-001'
  },
  {
    serviceListDetailID: 'sld-001-002',
    name: 'Revive',
    wholesale: '120.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '10.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-132sg-001-001'
  },
  {
    serviceListDetailID: 'sld-001-003',
    name: 'Sting dâu',
    wholesale: '180.000 đ',
    unitWholesale: '1 thùng (24 lon)',
    retail: '12.000 đ',
    unitRetail: '1 lon',
    serviceListID: 'sl-v-132sg-001-001'
  },
  {
    serviceListDetailID: 'sld-001-004',
    name: 'Cầu hải yến',
    wholesale: '240.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '15.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-132sg-001-001'
  },

  // Thuê vợt & Phụ kiện - Venue 001
  {
    serviceListDetailID: 'sld-001-005',
    name: 'Thuê vợt cầu lông',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '20.000 đ',
    unitRetail: '1 giờ',
    serviceListID: 'sl-v-132sg-001-002'
  },
  {
    serviceListDetailID: 'sld-001-006',
    name: 'Quả cầu Yonex',
    wholesale: '200.000 đ',
    unitWholesale: '1 hộp (12 quả)',
    retail: '25.000 đ',
    unitRetail: '1 quả',
    serviceListID: 'sl-v-132sg-001-002'
  },

  // Nước uống - Venue 002
  {
    serviceListDetailID: 'sld-002-001',
    name: 'Aquafina',
    wholesale: '48.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '5.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-tpt-ldh-002-001'
  },
  {
    serviceListDetailID: 'sld-002-002',
    name: 'Coca Cola',
    wholesale: '168.000 đ',
    unitWholesale: '1 thùng (24 lon)',
    retail: '10.000 đ',
    unitRetail: '1 lon',
    serviceListID: 'sl-v-tpt-ldh-002-001'
  },
  {
    serviceListDetailID: 'sld-002-003',
    name: 'Number 1',
    wholesale: '192.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '12.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-tpt-ldh-002-001'
  },

  // Dịch vụ cho thuê - Venue 002
  {
    serviceListDetailID: 'sld-002-004',
    name: 'Thuê vợt Yonex',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '30.000 đ',
    unitRetail: '1 giờ',
    serviceListID: 'sl-v-tpt-ldh-002-002'
  },
  {
    serviceListDetailID: 'sld-002-005',
    name: 'Thuê giày thể thao',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '50.000 đ',
    unitRetail: '1 lần',
    serviceListID: 'sl-v-tpt-ldh-002-002'
  },

  // Đồ uống giải khát - Venue 003
  {
    serviceListDetailID: 'sld-003-001',
    name: 'Dasani',
    wholesale: '50.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '5.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-pbht-003-001'
  },
  {
    serviceListDetailID: 'sld-003-002',
    name: 'Pepsi',
    wholesale: '180.000 đ',
    unitWholesale: '1 thùng (24 lon)',
    retail: '10.000 đ',
    unitRetail: '1 lon',
    serviceListID: 'sl-v-pbht-003-001'
  },

  // Nước giải khát - Venue 004
  {
    serviceListDetailID: 'sld-004-001',
    name: 'Red Bull',
    wholesale: '288.000 đ',
    unitWholesale: '1 thùng (24 lon)',
    retail: '18.000 đ',
    unitRetail: '1 lon',
    serviceListID: 'sl-v-nest-004-001'
  },
  {
    serviceListDetailID: 'sld-004-002',
    name: 'Trà xanh 0 độ',
    wholesale: '240.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '15.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-nest-004-001'
  },

  // Cho thuê dụng cụ - Venue 004
  {
    serviceListDetailID: 'sld-004-003',
    name: 'Thuê vợt cao cấp',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '40.000 đ',
    unitRetail: '1 giờ',
    serviceListID: 'sl-v-nest-004-002'
  },

  // Dịch vụ ăn uống - Venue 005
  {
    serviceListDetailID: 'sld-005-001',
    name: 'Nước cam ép',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '25.000 đ',
    unitRetail: '1 ly',
    serviceListID: 'sl-v-hua-005-001'
  },
  {
    serviceListDetailID: 'sld-005-002',
    name: 'Cafe sữa đá',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '20.000 đ',
    unitRetail: '1 ly',
    serviceListID: 'sl-v-hua-005-001'
  },

  // Nước uống - Venue 006
  {
    serviceListDetailID: 'sld-006-001',
    name: 'Nước suối Vĩnh Hảo',
    wholesale: '52.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '5.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-tanhoa-006-001'
  },

  // Đồ uống cao cấp - Venue 007
  {
    serviceListDetailID: 'sld-007-001',
    name: 'Nước ép trái cây tươi',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '35.000 đ',
    unitRetail: '1 ly',
    serviceListID: 'sl-v-bpb-007-001'
  },
  {
    serviceListDetailID: 'sld-007-002',
    name: 'Smoothie',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '45.000 đ',
    unitRetail: '1 ly',
    serviceListID: 'sl-v-bpb-007-001'
  },

  // Thuê vợt Pickleball - Venue 007
  {
    serviceListDetailID: 'sld-007-003',
    name: 'Thuê vợt Pickleball Pro',
    wholesale: '0 đ',
    unitWholesale: 'N/A',
    retail: '50.000 đ',
    unitRetail: '1 giờ',
    serviceListID: 'sl-v-bpb-007-002'
  },

  // Nước giải khát - Venue 008
  {
    serviceListDetailID: 'sld-008-001',
    name: 'C2 trà xanh',
    wholesale: '144.000 đ',
    unitWholesale: '1 thùng (24 chai)',
    retail: '10.000 đ',
    unitRetail: '1 chai',
    serviceListID: 'sl-v-hita-008-001'
  },
  {
    serviceListDetailID: 'sld-008-002',
    name: 'Sting vàng',
    wholesale: '180.000 đ',
    unitWholesale: '1 thùng (24 lon)',
    retail: '12.000 đ',
    unitRetail: '1 lon',
    serviceListID: 'sl-v-hita-008-001'
  }
];

/**
 * Khởi tạo danh sách ServiceList instances
 */
function getServiceLists(){
  return serviceListsData
}

/**
 * Khởi tạo danh sách ServiceListDetails instances
 */
function getServiceListDetails(){
  return serviceListDetailsData;
}

/**
 * Lấy ServiceListDetails theo ServiceListID
 */
function getServiceListDetailsByServiceListID(serviceListID: string) {
  return getServiceListDetails().filter(
    detail => detail.serviceListID === serviceListID
  );
}



export {
  getServiceLists,
  getServiceListDetails,
  getServiceListDetailsByServiceListID,

};

export default {
  getServiceLists,
  getServiceListDetails,
  getServiceListDetailsByServiceListID,
 
};