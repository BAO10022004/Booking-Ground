import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import "../assets/styles/PlayerLoginPage.css";
import { useAuth } from "../hooks";

export default function PlayerLoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const username = loginMethod === "phone" ? phone : email;
      await login(username, password);
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

  const handleGoogleLogin = () => {
    console.log("Google login - TODO: Implement");
  };

  if (loading) {
    return (
      <div className="player-login-page">
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
    <div className="player-login-page">
      <div className="player-login-container">
        <h1 className="player-login-title">Đăng nhập</h1>

        <div className="player-login-tabs">
          <button
            type="button"
            className={`player-tab ${loginMethod === "phone" ? "active" : ""}`}
            onClick={() => setLoginMethod("phone")}
          >
            Số điện thoại
          </button>
          <button
            type="button"
            className={`player-tab ${loginMethod === "email" ? "active" : ""}`}
            onClick={() => setLoginMethod("email")}
          >
            Email
          </button>
        </div>

        {error && <div className="player-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="player-login-form">
          {loginMethod === "phone" ? (
            <div className="player-input-group">
              <label className="player-label">Số điện thoại của bạn?</label>
              <div className="player-phone-input-wrapper">
                <div className="player-phone-prefix">
                  <span className="player-flag">🇻🇳</span>
                  <span className="player-country-code">+84</span>
                </div>
                <input
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="player-phone-input"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="player-input-group">
              <label className="player-label">Email của bạn?</label>
              <div className="player-input-wrapper">
                <input
                  type="email"
                  placeholder="Nhập email của bạn (*)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="player-input"
                  required
                />
                {email && (
                  <button
                    type="button"
                    className="player-clear-btn"
                    onClick={() => setEmail("")}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="player-input-group">
            <label className="player-label">Mật khẩu (*)</label>
            <div className="player-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu (*)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            className={`player-login-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "ĐĂNG NHẬP"}
          </button>
        </form>

        <div className="player-forgot-password">
          <p>
            Bạn quên mật khẩu?{" "}
            <button
              type="button"
              className="player-forgot-link"
              onClick={() => console.log("Forgot password - TODO")}
            >
              Quên mật khẩu
            </button>
          </p>
        </div>

        <div className="player-register-link">
          <p>
            Bạn chưa có tài khoản?{" "}
            <button
              type="button"
              className="player-register-link-btn"
              onClick={() => navigate("/player/register")}
            >
              Đăng ký
            </button>
          </p>
        </div>

        <div className="player-google-login">
          <button
            type="button"
            className="player-google-btn"
            onClick={handleGoogleLogin}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
