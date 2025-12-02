import { Bell } from 'lucide-react';
import '../assets/styles/Header.css'
import { useNavigate } from 'react-router-dom';
function getVietnameseDate() {
  
  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy"
  ];

  const now = new Date();
  const dayName = days[now.getDay()];

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${dayName}, ${day}/${month}/${year}`;
}

function Header() {
  const navigate = useNavigate();
  const currentDate = getVietnameseDate();
  const handleClickLogin = () => {
    navigate("/login/")
  };
  const handleClickRegisterPage = () => {
    navigate("/register/")
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="header-logo-section">
            <div className="header-logo">
              <span className="header-logo-icon">🎾</span>
            </div>

            {/* Hiển thị ngày tự động */}
            <span className="header-date">{currentDate}</span>
          </div>

          <button className="header-bell-button">
            <Bell className="w-6 h-6" />
          </button>
        </div>
        
        <div className="header-buttons">
          <button className="header-btn header-btn-login" onClick={handleClickLogin}>
            Đăng nhập
          </button>
          <button className="header-btn header-btn-register" onClick={handleClickRegisterPage}>
            Đăng kí
          </button>
        </div>
      </div>
    </header>
  );
}


export default Header;