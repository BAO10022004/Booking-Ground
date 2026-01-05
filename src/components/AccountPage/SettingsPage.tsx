import React, { useState } from "react";
import { Key, LogOut, Trash2, Lock } from "lucide-react";
import "../../assets/styles/SettingsPage.css";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";

const SettingsPage = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới không khớp");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      await authService.changePassword({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        password_confirmation: passwordData.confirmPassword,
      });
      alert("Đổi mật khẩu thành công");
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Error changing password:", error);
      alert(
        error?.message ||
          "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu hiện tại."
      );
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      await logout();
      navigate("/player/login", { replace: true });
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    if (
      !window.confirm(
        "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác."
      )
    ) {
      setShowDeleteConfirm(false);
      return;
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"
        }/auth/delete-account`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (response.ok) {
        alert("Tài khoản đã được vô hiệu hóa");
        await logout();
        navigate("/player/login", { replace: true });
      } else {
        const data = await response.json();
        alert(data.message || "Xóa tài khoản thất bại");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Có lỗi xảy ra khi xóa tài khoản");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2 className="settings-title">Cài đặt</h2>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Bảo mật</h3>
          <div className="settings-item">
            <div className="settings-item-info">
              <Key className="settings-item-icon" size={20} />
              <div>
                <div className="settings-item-title">Đổi mật khẩu</div>
                <div className="settings-item-description">
                  Thay đổi mật khẩu đăng nhập của bạn
                </div>
              </div>
            </div>
            <button
              className="settings-item-button"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              {showChangePassword ? "Hủy" : "Đổi mật khẩu"}
            </button>
          </div>

          {showChangePassword && (
            <div className="settings-password-form">
              <div className="settings-form-group">
                <label>Mật khẩu hiện tại</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>
              <div className="settings-form-group">
                <label>Mật khẩu mới</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="Nhập mật khẩu mới"
                />
              </div>
              <div className="settings-form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
              <button
                className="settings-save-button"
                onClick={handleChangePassword}
              >
                Lưu thay đổi
              </button>
            </div>
          )}
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Tài khoản</h3>
          <div className="settings-item">
            <div className="settings-item-info">
              <LogOut className="settings-item-icon" size={20} />
              <div>
                <div className="settings-item-title">Đăng xuất</div>
                <div className="settings-item-description">
                  Đăng xuất khỏi tài khoản hiện tại
                </div>
              </div>
            </div>
            <button className="settings-item-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>

          <div className="settings-item settings-item-danger">
            <div className="settings-item-info">
              <Trash2 className="settings-item-icon" size={20} />
              <div>
                <div className="settings-item-title">Xóa tài khoản</div>
                <div className="settings-item-description">
                  Vô hiệu hóa tài khoản của bạn (tắt trạng thái hoạt động)
                </div>
              </div>
            </div>
            <button
              className="settings-item-button settings-item-button-danger"
              onClick={handleDeleteAccount}
            >
              {showDeleteConfirm ? "Xác nhận xóa" : "Xóa tài khoản"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
