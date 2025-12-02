import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/RegisterPage.css';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration submitted:', formData);
    }, 1500);
  };

  const handleLoginClick = () => {
    // Add slide-out animation class
    document.querySelector('.register-page')?.classList.add('slide-out');
    
    setTimeout(() => {
      navigate('/login');
    }, 600);
  };

  return (
    <div className="register-page">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80" 
        alt="background" 
        className="register-bg-image"
      />
      
      {/* Overlay */}
      <div className="register-bg-overlay"></div>

      {/* Moving Frames */}
      <div className="moving-frame-1"></div>
      <div className="moving-frame-2"></div>

      <div className="register-container">
        {/* Left Panel - Welcome Message */}
        <div className="welcome-card-register">
          <h2 className="welcome-title-register">Chào mừng bạn !</h2>
          <p className="welcome-text-register">
            Đăng ký ngay hôm nay để trở thành thành viên của GIÁO DỤC CHÁNH HIỆP.
          </p>
          <div className="welcome-divider-register"></div>
          <p className="welcome-subtext-register">
            Nếu bạn đã có tài khoản, vui lòng <strong>ĐĂNG NHẬP</strong> để sử dụng những tính năng của chúng tôi.
          </p>
          <button className="login-link-button" onClick={handleLoginClick}>
            ĐĂNG NHẬP
          </button>
        </div>

        {/* Right Panel - Register Form */}
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Đăng ký</h1>
            <div className="register-underline"></div>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {/* Full Name Input */}
            <div className="form-group">
              <label className="form-label">Họ tên</label>
              <div className="input-group">
                <div className="input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ tên của bạn"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="register-input"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-group">
                <div className="input-icon">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  className="register-input"
                  required
                />
              </div>
            </div>

            {/* Username Input */}
            <div className="form-group">
              <label className="form-label">Tài khoản</label>
              <div className="input-group">
                <div className="input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Nhập tài khoản của bạn"
                  value={formData.username}
                  onChange={handleChange}
                  className="register-input"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label className="form-label">Mật khẩu</label>
              <div className="input-group">
                <div className="input-icon">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Nhập mật khẩu (5-15 ký tự)"
                  value={formData.password}
                  onChange={handleChange}
                  className="register-input"
                  minLength={5}
                  maxLength={15}
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
            </div>

            {/* Confirm Password Input */}
            <div className="form-group">
              <label className="form-label">Nhập lại mật khẩu</label>
              <div className="input-group">
                <div className="input-icon">
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="register-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button 
              type="submit" 
              className={`register-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                'Đăng ký'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}