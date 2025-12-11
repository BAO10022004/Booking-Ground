import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import "../assets/styles/FieldOwnerLoginPage.css";
import { useAuth } from "../hooks";

export default function FieldOwnerLoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(phoneOrEmail, password);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 100);
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestClick = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="field-owner-login-page">
        <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
          Đang tải...
        </div>
      </div>
    );
  }

  return (
    <div className="field-owner-login-page">
      <img
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
        alt="background"
        className="field-owner-bg-image"
      />
      <div className="field-owner-bg-overlay"></div>

      <div className="field-owner-login-card">
        <h1 className="field-owner-title">Đăng nhập - Chủ sân</h1>
        <p className="field-owner-subtitle">ALOBO - Quản lý sân thể thao</p>

        {error && <div className="field-owner-error">{error}</div>}

        <form onSubmit={handleSubmit} className="field-owner-form">
          <div className="field-owner-input-group">
            <label className="field-owner-label">
              Số điện thoại hoặc email
            </label>
            <div className="field-owner-input-wrapper">
              <input
                type="text"
                placeholder="Nhập số điện thoại hoặc email"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="field-owner-input"
                required
              />
              {phoneOrEmail && (
                <button
                  type="button"
                  className="field-owner-clear-btn"
                  onClick={() => setPhoneOrEmail("")}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="field-owner-input-group">
            <label className="field-owner-label">Mật khẩu</label>
            <div className="field-owner-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-owner-input"
                required
              />
              <button
                type="button"
                className="field-owner-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`field-owner-login-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "ĐĂNG NHẬP"}
          </button>
        </form>

        <div className="field-owner-guest-link">
          <p>
            Nếu bạn là <strong>KHÁCH CHƠI</strong>,{" "}
            <button
              type="button"
              className="field-owner-guest-btn"
              onClick={handleGuestClick}
            >
              bấm vào đây để tải ứng dụng ALOBO - Tìm kiếm và đặt lịch
            </button>
          </p>
        </div>

        <div className="field-owner-register-link">
          <p>
            Bạn chưa có tài khoản?{" "}
            <button
              type="button"
              className="field-owner-register-btn"
              onClick={() => navigate("/player/register")}
            >
              Xem hướng dẫn
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
