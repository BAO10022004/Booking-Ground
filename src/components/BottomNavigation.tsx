import { Home, Map, Star, User } from "lucide-react";
import "../assets/styles/BottomNavigation.css";

// Khai báo kiểu cho props
interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Trang chủ", badge: null },
    { id: "map", icon: Map, label: "Bản đồ", badge: null },
    { id: "promotion", icon: Star, label: "Nổi bật", badge: null },
    { id: "account", icon: User, label: "Tài khoản", badge: null },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-button ${
                activeTab === item.id ? "active" : "inactive"
              }`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="badge">{item.badge}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
