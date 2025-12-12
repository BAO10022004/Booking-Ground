import React, { useState, useEffect } from "react";
import "../assets/styles/LoginPage.css";
import LoginFormPage from "../components/LoginFormPage";
import RegisterForm from "../components/RegisterForm";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isLoginAgument } = useParams<{
    isLoginAgument: string;
  }>();
  const { login, register, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setLogin] = useState(isLoginAgument == "true" ? true : false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (isLogin) {
        await login(email, password);
        navigate("/");
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Mật khẩu xác nhận không khớp");
          setIsLoading(false);
          return;
        }

        await register({
          phone_number: formData.username,
          email: formData.email,
          name: formData.fullName,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          gender: false,
          birthday: new Date().toISOString().split("T")[0],
        });
        navigate("/");
      }
    } catch (err: any) {
      setError(err?.message || "Đăng nhập/Đăng ký thất bại. Vui lòng thử lại.");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    setLogin(!isLogin);
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
  };

  if (loading) {
    return (
      <div className="login-page">
        <div style={{ padding: "40px", textAlign: "center" }}>Đang tải...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

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
      {error && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ff4444",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {error}
        </div>
      )}
      {isLogin == true ? (
        <LoginFormPage
          username={email}
          handleForgotPassword={handleForgotPassword}
          handleSubmit={handleSubmit}
          handleRegister={handleRegister}
          isLoading={isLoading}
          password={password}
          rememberMe={rememberMe}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          setShowPassword={setShowPassword}
          setUsername={setEmail}
          showPassword={showPassword}
        />
      ) : (
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          handleForgotPassword={handleForgotPassword}
          handleRegister={handleRegister}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          password={password}
          rememberMe={rememberMe}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          setShowConfirmPassword={setShowConfirmPassword}
          setShowPassword={setShowPassword}
          setUsername={setEmail}
          showConfirmPassword={showConfirmPassword}
          showPassword={showPassword}
          username={email}
        />
      )}
    </div>
  );
}
