
import type { FormEvent, ChangeEvent } from 'react';
import {
User,
Lock,
EyeOff,
Eye,
Mail}
from 'lucide-react'
import '../assets/styles/RegisterPage.css'
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
    formData: {
      fullName: string;
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
      
    };
    showConfirmPassword: boolean;
    setShowConfirmPassword: (value: boolean) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function RegisterForm ({
    handleSubmit,
    showPassword,
    setShowPassword,
    isLoading,
    formData,
    handleChange,
    showConfirmPassword,
    setShowConfirmPassword,
    handleRegister
}: LoginFormPageProps)
{   
    
    return (
         <div className="login-container">
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
            Đăng nhập
            
          </button>
        </div>
        </div>

        
    )
}
export default RegisterForm