import React, { useState } from 'react';
import { User, Mail, Calendar, Phone } from 'lucide-react';
import '../../assets/styles/ProfilePage.css';

// Mock data dựa trên cấu trúc ACCOUNTS table
const mockUser = {
  UserID: "123e4567-e89b-12d3-a456-426614174000",
  PhoneNumber: "0912345678",
  Email: "nguyenvana@email.com",
  FullName: "Nguyễn Văn A",
  Gender: false, // 0 = nam
  Birthday: "1990-01-15",
  Role: true,
  IsAdmin: false,
  IsActive: true,
  AvatarID: null,
  CoverImageID: null
};

const ProfilePage = () => {
  const [user] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (dateString: string ) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleSave = () => {
    // Logic lưu thông tin
    console.log('Saving user data...');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page-content">
      <div className="profile-header-section">
        <div>
          <h1 className="profile-content-title">Thông tin cá nhân</h1>
          <p className="profile-content-subtitle">Chi tiết và cài đặt tài khoản</p>
        </div>
        {!isEditing && (
          <button 
            className="edit-profile-button"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh sửa
          </button>
        )}
      </div>

      <div className="profile-form-section">
        {/* Profile Description */}
        <div className="profile-description-section">
          <label className="profile-input-label-small">Nội dung cho profile</label>
          <div className="profile-description-placeholder">
            Nội dung cho profile
          </div>
        </div>

        {/* Personal Information */}
        <div className="profile-info-section">
          <h3 className="profile-section-title">Thông tin chi tiết</h3>
          
          <div className="profile-input-grid">
            {/* Full Name */}
            <div className="profile-input-group">
              <label className="profile-input-label">
                <User size={16} className="profile-label-icon" />
                Họ và tên
              </label>
              <input 
                type="text" 
                value={user.FullName}
                readOnly={!isEditing}
                className="profile-input-field"
              />
            </div>

            {/* Email */}
            <div className="profile-input-group">
              <label className="profile-input-label">
                <Mail size={16} className="profile-label-icon" />
                Email
              </label>
              <input 
                type="email" 
                value={user.Email}
                readOnly={!isEditing}
                className="profile-input-field"
              />
            </div>

            {/* Phone Number */}
            <div className="profile-input-group">
              <label className="profile-input-label">
                <Phone size={16} className="profile-label-icon" />
                Số điện thoại
              </label>
              <input 
                type="tel" 
                value={user.PhoneNumber}
                readOnly={!isEditing}
                className="profile-input-field"
              />
            </div>

            {/* Birthday */}
            <div className="profile-input-group">
              <label className="profile-input-label">
                <Calendar size={16} className="profile-label-icon" />
                Ngày sinh
              </label>
              <input 
                type="text" 
                value={formatDate(user.Birthday)}
                readOnly={!isEditing}
                className="profile-input-field"
              />
            </div>

            {/* Gender */}
            <div className="profile-input-group">
              <label className="profile-input-label">Giới tính</label>
              <div className="profile-radio-group">
                <label className="profile-radio-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={!user.Gender}
                    disabled={!isEditing}
                    className="profile-radio-input"
                  />
                  <span className="profile-radio-text">Nam</span>
                </label>
                <label className="profile-radio-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={user.Gender}
                    disabled={!isEditing}
                    className="profile-radio-input"
                  />
                  <span className="profile-radio-text">Nữ</span>
                </label>
              </div>
            </div>

            {/* Status */}
            <div className="profile-input-group">
              <label className="profile-input-label">Trạng thái</label>
              <div className="profile-status-wrapper">
                <span className={`profile-status-badge ${user.IsActive ? 'profile-status-active' : 'profile-status-inactive'}`}>
                  <span className={`profile-status-dot ${user.IsActive ? 'profile-dot-active' : 'profile-dot-inactive'}`}></span>
                  {user.IsActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="profile-button-group">
              <button className="profile-btn-primary" onClick={handleSave}>
                Lưu thay đổi
              </button>
              <button className="profile-btn-secondary" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;