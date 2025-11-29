import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Heart, 
  Clock, 
  CreditCard, 
  Bell, 
  LogOut,
  ChevronRight,
  Edit,
  Camera,
  Shield,
  HelpCircle,
  FileText,
  Share2
} from 'lucide-react';
import '../assets/styles/AccountPage.css';

function AccountPage() {
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123 456 789',
    address: 'TP. Hồ Chí Minh',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=10b981&color=fff&size=200',
    memberSince: 'Tháng 1, 2024'
  });

  const stats = [
    { label: 'Đã đặt', value: '12', icon: Calendar, color: 'blue' },
    { label: 'Yêu thích', value: '8', icon: Heart, color: 'red' },
    { label: 'Đánh giá', value: '5', icon: '⭐', color: 'yellow' }
  ];

  const menuItems = [
    { 
      title: 'Thông tin cá nhân', 
      icon: User, 
      color: 'emerald',
      action: () => console.log('Edit profile')
    },
    { 
      title: 'Lịch sử đặt sân', 
      icon: Clock, 
      color: 'blue',
      badge: '3',
      action: () => console.log('History')
    },
    { 
      title: 'Sân yêu thích', 
      icon: Heart, 
      color: 'red',
      badge: '8',
      action: () => console.log('Favorites')
    },
    { 
      title: 'Phương thức thanh toán', 
      icon: CreditCard, 
      color: 'purple',
      action: () => console.log('Payment')
    },
    { 
      title: 'Thông báo', 
      icon: Bell, 
      color: 'orange',
      action: () => console.log('Notifications')
    },
    { 
      title: 'Cài đặt', 
      icon: Settings, 
      color: 'gray',
      action: () => console.log('Settings')
    }
  ];

  const supportItems = [
    { title: 'Bảo mật & Quyền riêng tư', icon: Shield, color: 'emerald' },
    { title: 'Trung tâm trợ giúp', icon: HelpCircle, color: 'blue' },
    { title: 'Điều khoản & Chính sách', icon: FileText, color: 'gray' },
    { title: 'Chia sẻ ứng dụng', icon: Share2, color: 'purple' }
  ];

  return (
    <div className="account-page">
      {/* Header Profile Card */}
      <div className="profile-header">
        <div className="profile-card">
          <div className="profile-avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <button className="avatar-edit-button">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-member">Thành viên từ {user.memberSince}</p>
          </div>

          <button className="profile-edit-button">
            <Edit className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-${stat.color}`}>
              <div className="stat-icon-wrapper">
                {typeof stat.icon === 'string' ? (
                  <span className="stat-emoji">{stat.icon}</span>
                ) : (
                  <stat.icon className="stat-icon" />
                )}
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-section">
        <h3 className="section-title">Tài khoản của tôi</h3>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <button 
              key={index} 
              className="menu-item"
              onClick={item.action}
            >
              <div className="menu-item-left">
                <div className={`menu-icon menu-icon-${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="menu-title">{item.title}</span>
              </div>
              <div className="menu-item-right">
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
                <ChevronRight className="menu-arrow" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="menu-section">
        <h3 className="section-title">Hỗ trợ</h3>
        <div className="menu-list">
          {supportItems.map((item, index) => (
            <button key={index} className="menu-item">
              <div className="menu-item-left">
                <div className={`menu-icon menu-icon-${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="menu-title">{item.title}</span>
              </div>
              <ChevronRight className="menu-arrow" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button">
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Version Info */}
      <div className="version-info">
        <p>Phiên bản 1.0.0</p>
      </div>
    </div>
  );
}

export default AccountPage;