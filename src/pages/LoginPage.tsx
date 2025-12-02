import React, { useState } from 'react';
import '../assets/styles/LoginPage.css';
import LoginFormPage from '../components/LoginFormPage';
import RegisterForm from '../components/RegisterForm';
import { useParams, useNavigate } from 'react-router-dom';

export default function LoginPage() {
   const navigate = useNavigate(); 
   const { isLoginAgument } = useParams<{
       isLoginAgument: string;

     }>();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setLogin] = useState(isLoginAgument == "true"? true: false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false); 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLogin(!isLogin)
    };
    const handleLoginClick = () => {
      // Add slide-out animation class
      document.querySelector('.register-page')?.classList.add('slide-out');
      
      setTimeout(() => {
      }, 600);
    };
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
    setLogin(!isLogin)
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
      {
        isLogin == true ?
        <LoginFormPage
              username={username}
              handleForgotPassword={handleForgotPassword}
              handleSubmit={handleSubmit}
              handleRegister={handleRegister}
              isLoading= {isLoading}
              password={password}
              rememberMe={rememberMe}
              setPassword={setPassword}
              setRememberMe={setRememberMe}
              setShowPassword={setShowPassword}
              setUsername={setUsername}
              showPassword={showPassword}
              />:
          <RegisterForm
                  formData={formData}
                  handleChange={handleChange}
                  handleForgotPassword={handleForgotPassword}
                  handleRegister={handleRegister}
                  handleSubmit={handleSubmit}
                  isLoading ={isLoading}
                  password={password}
                  rememberMe= {rememberMe}
                  setPassword={setPassword}
                  setRememberMe={setRememberMe}
                  setShowConfirmPassword={setShowConfirmPassword}
                  setShowPassword={setShowPassword}
                  setUsername={setUsername}
                  showConfirmPassword={showConfirmPassword}
                  showPassword = {showPassword}
                  username={username}
                
                />
      }
      
      
    </div>
  );
}