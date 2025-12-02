import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/LoginPage.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login submitted:', { username, password, rememberMe });
    }, 1500);
  };

  const handleRegister = () => {
    // Add slide-out animation class
    document.querySelector('.login-page')?.classList.add('slide-out');
    
    setTimeout(() => {
      navigate('/register');
    }, 600);
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password');
    // Add forgot password logic here
  };

  return (
    <div className="login-page">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80" 
        alt="background" 
        className="login-bg-image"
      />
      
      {/* Overlay */}
      <div className="login-bg-overlay"></div>

      {/* Moving Frames */}
      <div className="moving-frame-1"></div>
      <div className="moving-frame-2"></div>

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
                type="text"
                placeholder="Tài khoản"
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
                type={showPassword ? 'text' : 'password'}
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
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Đăng nhập'
              )}
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
            Nếu bạn chưa có tài khoản, vui lòng <strong>ĐĂNG KÝ</strong> để trở thành thành viên của chúng tôi.
          </p>
          <button className="register-button" onClick={handleRegister}>
            ĐĂNG KÝ
          </button>
        </div>
      </div>
    </div>
  );
}