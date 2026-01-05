import { useState, useEffect } from "react";
import {
  Calendar,
  Bell,
  GraduationCap,
  Gift,
  Users,
  ChevronRight,
  ArrowLeft,
  Settings,
  Info,
  Shield,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/AccountPage.css";
import BookingsPage from "../components/AccountPage/BookingsPage";
import ProfilePage from "../components/AccountPage/ProfilePage";
import SettingsPage from "../components/AccountPage/SettingsPage";
import ComingSoonPage from "../components/ComingSoonPage";
import { useAuth } from "../hooks";
import getAvatarForUser from "../utils/get_image";

function AccountPage() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/player/login", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);
  const [selectedMenu, setSelectedMenu] = useState<string | null>("booked");

  const memberButtons = [
    {
      id: "booked",
      label: "Lịch đã đặt",
      icon: Calendar,
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: Bell,
    },
    {
      id: "courses",
      label: "Khoá học",
      icon: GraduationCap,
    },
    {
      id: "offers",
      label: "Ưu đãi",
      icon: Gift,
    },
  ];

  const activityItems = [
    {
      id: "my-group",
      title: "Nhóm của tôi",
      icon: Users,
    },
    {
      id: "class-schedule",
      title: "Danh sách lịch học",
      icon: GraduationCap,
    },
  ];

  const systemItems = [
    {
      id: "settings",
      title: "Cài đặt",
      icon: Settings,
    },
    {
      id: "version",
      title: "Thông tin phiên bản",
      icon: Info,
    },
    {
      id: "terms",
      title: "Điều khoản và chính sách",
      icon: Shield,
    },
    {
      id: "whats-new",
      title: "Ứng dụng có gì mới",
      icon: Sparkles,
      badge: "NEW",
    },
  ];

  const handleMenuClick = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  const handleLogout = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      await logout();
      navigate("/player/login", { replace: true });
    }
  };

  const renderContent = () => {
    try {
      switch (selectedMenu) {
        case "booked": {
          return <BookingsPage />;
        }
        case "profile": {
          return <ProfilePage />;
        }
        case "settings": {
          return <SettingsPage />;
        }
        case "notifications":
        case "courses":
        case "offers":
        case "my-group":
        case "class-schedule":
        case "version":
        case "terms":
        case "whats-new": {
          return <ComingSoonPage />;
        }
        default: {
          return <ComingSoonPage />;
        }
      }
    } catch (error) {
      return (
        <div className="account-empty-state">
          <div className="account-empty-icon">⚠️</div>
          <p className="account-empty-text">
            Có lỗi xảy ra. Vui lòng thử lại sau.
          </p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="account-page">
        <div style={{ padding: "40px", textAlign: "center" }}>Đang tải...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="account-page">
      <div className="account-sidebar">
        {/* <button
          className="account-back-button"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft size={20} />
        </button> */}

        <div className="account-profile-section">
          <div className="account-avatar-wrapper">
            <img
              src={getAvatarForUser(user)}
              alt={user.fullName}
              className="account-avatar"
            />
          </div>
          <div className="account-profile-name">{user.fullName}</div>
          <button
            className="account-edit-button"
            onClick={() => handleMenuClick("profile")}
            title="Chỉnh sửa thông tin"
          >
            <span>✏️</span>
          </button>
        </div>

        <div className="account-member-rank-section">
          <div className="account-member-rank-card">
            <span className="account-member-rank-icon">💎</span>
            <span className="account-member-rank-text">Hạng thành viên</span>
            <ChevronRight size={16} />
          </div>
          <div className="account-member-buttons">
            {memberButtons.map((button) => (
              <button
                key={button.id}
                className={`account-member-button ${
                  selectedMenu === button.id ? "active" : ""
                }`}
                onClick={() => handleMenuClick(button.id)}
              >
                <button.icon size={20} />
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="account-activity-section">
          <h3 className="account-section-title">Hoạt động</h3>
          <div className="account-menu-list">
            {activityItems.map((item) => (
              <button
                key={item.id}
                className="account-menu-item"
                onClick={() => handleMenuClick(item.id)}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="account-system-section">
          <h3 className="account-section-title">Hệ thống</h3>
          <div className="account-menu-list">
            {systemItems.map((item) => (
              <button
                key={item.id}
                className="account-menu-item"
                onClick={() => handleMenuClick(item.id)}
              >
                <item.icon size={20} />
                <span>{item.title}</span>
                {item.badge && (
                  <span className="account-menu-badge">{item.badge}</span>
                )}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="account-version-info">
          <p>Thông tin phiên bản: 2.8.1</p>
        </div>

        {/* <div className="account-logout-section">
          <button className="account-logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div> */}
      </div>

      <div className="account-content">
        <div className="account-content-header">
          {/* <button
            className="account-content-back"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft size={20} />
          </button> */}
          <h2 className="account-content-title">
            {selectedMenu === "booked"
              ? "Danh sách đặt lịch"
              : selectedMenu === "profile"
              ? "Thông tin cá nhân"
              : selectedMenu === "settings"
              ? "Cài đặt"
              : "Tài khoản"}
          </h2>
          {/* <button className="account-content-view-all">
            <Calendar size={16} />
            <span>Xem tất cả</span>
          </button> */}
        </div>
        <div className="account-content-body">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AccountPage;
