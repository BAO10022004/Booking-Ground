import "../assets/styles/Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import getAvatarForUser from "../utils/get_image";

function getVietnameseDate() {
  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
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
  const { user, isAuthenticated } = useAuth();
  const currentDate = getVietnameseDate();
  const handleClickLogin = () => {
    navigate("/player/login");
  };
  const handleClickRegisterPage = () => {
    navigate("/player/register");
  };
  const handleClickProfile = () => {
    navigate("/");
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          <div className="header-logo-section">
            {/* <div className="header-logo"></div> */}
            <span className="header-date">{currentDate}</span>
          </div>
        </div>

        {isAuthenticated && user ? (
          <div
            className="header-user-info"
            onClick={handleClickProfile}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
            }}
          >
            <img
              src={getAvatarForUser(user)}
              alt={user.fullName}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
              {user.fullName}
            </span>
          </div>
        ) : (
          <div className="header-buttons">
            <button
              className="header-btn header-btn-login"
              onClick={handleClickLogin}
            >
              Đăng nhập
            </button>
            <button
              className="header-btn header-btn-register"
              onClick={handleClickRegisterPage}
            >
              Đăng kí
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
