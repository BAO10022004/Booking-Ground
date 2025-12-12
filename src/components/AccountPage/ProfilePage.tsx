import React, { useState } from "react";
import { User, Mail, Calendar, Phone } from "lucide-react";
import "../../assets/styles/ProfilePage.css";
import { useAuth } from "../../hooks";

const ProfilePage = () => {
  const { user: account, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>Đang tải...</div>
    );
  }

  if (!account) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Vui lòng đăng nhập
      </div>
    );
  }

  const user = {
    UserID: account.userId,
    PhoneNumber: account.phoneNumber,
    Email: account.email,
    FullName: account.fullName,
    Gender: account.gender,
    Birthday: account.birthday.toISOString().split("T")[0],
    Role: account.role,
    IsAdmin: account.isAdmin,
    IsActive: account.isActive,
    AvatarID: account.avatarId || null,
    CoverImageID: account.coverImageId || null,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleSave = () => {
    // Logic lưu thông tin
    // Saving user data...
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
          <p className="profile-content-subtitle">
            Chi tiết và cài đặt tài khoản
          </p>
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
          <label className="profile-input-label-small">
            Nội dung cho profile
          </label>
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
                <span
                  className={`profile-status-badge ${
                    user.IsActive
                      ? "profile-status-active"
                      : "profile-status-inactive"
                  }`}
                >
                  <span
                    className={`profile-status-dot ${
                      user.IsActive
                        ? "profile-dot-active"
                        : "profile-dot-inactive"
                    }`}
                  ></span>
                  {user.IsActive ? "Đang hoạt động" : "Ngừng hoạt động"}
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
