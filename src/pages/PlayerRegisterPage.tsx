import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import "../assets/styles/PlayerRegisterPage.css";
import { useAuth } from "../hooks";

export default function PlayerRegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu xác nhận không khớp");
        setIsLoading(false);
        return;
      }

      await register({
        phone_number: formData.phone,
        email: formData.email,
        name: formData.fullName,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        gender: false,
        birthday: new Date().toISOString().split("T")[0],
      });
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 100);
    } catch (err: any) {
      setError(err?.message || "Đăng ký thất bại. Vui lòng thử lại.");
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="player-register-page">
        <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
          Đang tải...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="player-register-page">
      <div className="player-register-container">
        <h1 className="player-register-title">Đăng ký</h1>

        {error && <div className="player-register-error">{error}</div>}

        <form onSubmit={handleSubmit} className="player-register-form">
          <div className="player-input-group">
            <label className="player-label">Số điện thoại của bạn?</label>
            <div className="player-phone-input-wrapper">
              <div className="player-phone-prefix">
                <span className="player-flag">🇻🇳</span>
                <span className="player-country-code">+84</span>
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                className="player-phone-input"
                required
              />
            </div>
          </div>

          <div className="player-input-group">
            <label className="player-label">Email của bạn?</label>
            <div className="player-input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Nhập email của bạn (*)"
                value={formData.email}
                onChange={handleChange}
                className="player-input"
                required
              />
              {formData.email && (
                <button
                  type="button"
                  className="player-clear-btn"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, email: "" }))
                  }
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="player-input-group">
            <label className="player-label">Tên đầy đủ</label>
            <div className="player-input-wrapper">
              <input
                type="text"
                name="fullName"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={handleChange}
                className="player-input"
                required
              />
              {formData.fullName && (
                <button
                  type="button"
                  className="player-clear-btn"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, fullName: "" }))
                  }
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="player-input-group">
            <label className="player-label">Mật khẩu (*)</label>
            <div className="player-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Nhập mật khẩu (*)"
                value={formData.password}
                onChange={handleChange}
                className="player-input"
                required
              />
              <button
                type="button"
                className="player-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="player-input-group">
            <label className="player-label">Nhập mật khẩu (*)</label>
            <div className="player-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu (*)"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="player-input"
                required
              />
              <button
                type="button"
                className="player-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`player-register-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "ĐĂNG KÝ"}
          </button>
        </form>

        <div className="player-login-link">
          <p>
            Bạn đã có tài khoản?{" "}
            <button
              type="button"
              className="player-login-link-btn"
              onClick={() => navigate("/player/login")}
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
