class Account {
  readonly userId: string; 

  /** (Unique, Not Null) Số điện thoại */
  phoneNumber: string; 

  /** (Unique, Not Null) Địa chỉ Email */
  email: string; 

  /** (Not Null) Tên đầy đủ */
  fullName: string; 

  /** (Not Null, Unique) Mật khẩu (Hash) */
  password: string; 

  /** (Not Null) Giới tính: True=1 (Nữ), False=0 (Nam) */
  gender: boolean; 

  /** (Not Null) Ngày sinh */
  birthday: Date; 

  /** (Not Null) Vai trò: True=Người dùng bình thường (1) */
  role: boolean; 

  /** (Not Null) Quyền Admin: False=Người dùng/chủ sở hữu (0), True=Admin (1) */
  isAdmin: boolean; 

  /** (Not Null) Trạng thái hoạt động: True=Đang hoạt động (1), False=Ngừng hoạt động (0) */
  isActive: boolean; 

  /** (Not Null) ID ảnh đại diện, tham chiếu đến bảng Image */
  avatarId: boolean; 

  /** (Not Null) ID ảnh bìa, tham chiếu đến bảng Image */
  coverImageId: boolean; 

  constructor({
    userId,
    phoneNumber,
    email,
    fullName,
    password,
    gender,
    birthday,
    role,
    isAdmin,
    isActive,
    avatarId,
    coverImageId,
  }: {
    userId: string;
    phoneNumber: string;
    email: string;
    fullName: string;
    password: string;
    gender: boolean;
    birthday: Date;
    role: boolean;
    isAdmin: boolean;
    isActive: boolean;
    avatarId: boolean;
    coverImageId: boolean;
  }) {
    // Trường Readonly (PK)
    this.userId = userId; 
    
    // Các trường Not Null
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.fullName = fullName;
    this.password = password;
    this.gender = gender;
    this.birthday = birthday;
    this.role = role;
    this.isAdmin = isAdmin;
    this.isActive = isActive;
    this.avatarId = avatarId;
    this.coverImageId = coverImageId;
  }
}

export default Account;