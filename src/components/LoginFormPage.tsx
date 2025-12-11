import type { FormEvent } from "react";
import { User, Lock, EyeOff, Eye } from "lucide-react";
import "../assets/styles/LoginForm.css";
interface LoginFormPageProps {
  username: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  setUsername: (value: string) => void;
  showPassword: boolean;
  password: string;
  setPassword: (value: string) => void;
  setShowPassword: (value: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  handleForgotPassword: () => void;
  isLoading: boolean;
  handleRegister: () => void;
}

function LoginFormPage({
  username,
  handleSubmit,
  setUsername,
  showPassword,
  password,
  setPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  handleForgotPassword,
  isLoading,
  handleRegister,
}: LoginFormPageProps) {
  return (
    <div className="login-container">
      {/* Left Panel - Login Form */}
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Đăng nhập</h1>
          <div className="login-underline"></div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="input-group">
            <div className="input-icon">
              <User size={20} />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <div className="input-icon">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember & Forgot Password */}
          <div className="login-options">
            <label className="remember-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Nhớ mật khẩu</span>
            </label>
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Quên mật khẩu
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "Đăng nhập"}
          </button>
        </form>
      </div>

      {/* Right Panel - Welcome Message */}
      <div className="welcome-card">
        <h2 className="welcome-title">Xin chào !</h2>
        <p className="welcome-text">
          Chào mừng bạn đến với GIÁO DỤC CHÁNH HIỆP.
        </p>
        <div className="welcome-divider"></div>
        <p className="welcome-subtext">
          Nếu bạn chưa có tài khoản, vui lòng <strong>ĐĂNG KÝ</strong> để trở
          thành thành viên của chúng tôi.
        </p>
        <button className="register-button" onClick={handleRegister}>
          ĐĂNG KÝ
        </button>
      </div>
    </div>
  );
}
export default LoginFormPage;
