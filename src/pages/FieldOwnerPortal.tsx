import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import "../assets/styles/FieldOwnerPortal.css";

export default function FieldOwnerPortal() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="field-owner-portal">
      <div className="portal-header">
        <h1>Quản lý sân thể thao</h1>
        <div className="portal-user-info">
          <p>Xin chào, {user?.fullName || "Chủ sân"}</p>
          <button onClick={handleLogout} className="portal-logout-btn">
            Đăng xuất
          </button>
        </div>
      </div>
      <div className="portal-content">
        <div className="portal-placeholder">
          <h2>Trang quản lý sân thể thao</h2>
          <p>Chức năng quản lý sẽ được phát triển tại đây</p>
        </div>
      </div>
    </div>
  );
}
