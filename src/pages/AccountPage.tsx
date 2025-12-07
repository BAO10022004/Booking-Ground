import { useState } from 'react';
import { 
  Calendar, 
  Heart, 
  LogOut,
  Shield,
  HelpCircle,
  FileText,
  Share2,
  ChevronRight,
  TicketPercent,
  User,
  Settings
} from 'lucide-react';
import '../assets/styles/AccountPage.css';
import BookingsPage from '../components/AccountPage/BookingsPage'
import GetAccount  from '../utils/get_account';
import HeaderProfileCard from '../components/HeaderProfileCard';
import ProfilePage from '../components/AccountPage/ProfilePage';
function AccountPage() {
  const [user] = useState(GetAccount);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const stats = [
    {id: 'booked', label: 'Đã đặt', value: '12', icon: Calendar, color: 'blue' },
    {id: 'liked', label: 'Yêu thích', value: '8', icon: Heart, color: 'red' },
    {id: 'rating', label: 'Đánh giá', value: '5', icon: '⭐', color: 'yellow' }
  ];

  const menuItems = [
    { id: 'profile', title: 'Thông tin cá nhân', icon: User, color: 'emerald' },
    { id: 'voucher', title: 'Ưu đãi', icon: TicketPercent, color: 'red' }
    
  ];

  const supportItems = [
    { id: 'settings', title: 'Cài đặt', icon: Settings, color: 'gray' },
    { id: 'privacy', title: 'Bảo mật & Quyền riêng tư', icon: Shield, color: 'emerald' },
    { id: 'help', title: 'Trung tâm trợ giúp', icon: HelpCircle, color: 'blue' },
    { id: 'terms', title: 'Điều khoản & Chính sách', icon: FileText, color: 'gray' },
    { id: 'share', title: 'Chia sẻ ứng dụng', icon: Share2, color: 'purple' }
  ];

  // Add ripple effect
  const handleClick = (e: React.MouseEvent<HTMLElement>, callback: () => void) => {
    const element = e.currentTarget;
    element.classList.add('ripple-effect');
    
    setTimeout(() => {
      element.classList.remove('ripple-effect');
      callback();
    }, 300);
  };

  const handleMenuClick = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  const renderContent = () => {
    if (!selectedMenu) {
      return (
        <div className="empty-state">
          <div className="empty-icon">👈</div>
          <h3 className="empty-title">Chọn một mục để xem chi tiết</h3>
          <p className="empty-text">
            Vui lòng chọn một mục từ menu bên trái để xem nội dung tương ứng
          </p>
        </div>
      );
    }

    const selectedItem = [...menuItems, ...supportItems].find(m => m.id === selectedMenu);
    
    switch(selectedItem?.id  ?? selectedMenu)
    {
      case 'profile':{
        return <ProfilePage/>
      }
      case 'booked':{
        return <BookingsPage/>
      }
    }
  };

  return (
    <div className="account-page">
      {/* Left Sidebar */}
      <div className="account-sidebar">
        <div className="profile-header">
          {user  ? <HeaderProfileCard user={user} /> : null}
          
          {/* Stats with ripple effect */}
          <div className="profile-stats">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`stat-card stat-${stat.color}`}
                onClick={(e) => handleClick(e, () => {setSelectedMenu(stat.id)})}
              >
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

        {/* Menu Items with ripple effect */}
        <div className="menu-section">
          <h3 className="section-title">Tài khoản của tôi</h3>
          <div className="menu-list">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`menu-item ${selectedMenu === item.id ? 'active' : ''}`}
                onClick={(e) => handleClick(e, () => handleMenuClick(item.id))}
              >
                <div className="menu-item-left">
                  <div className={`menu-icon menu-icon-${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="menu-title">{item.title}</span>
                </div>
                <div className="menu-item-right">
                  {/* {item.icon && <span className="menu-badge">{item.icon}</span>} */}
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
              <button
                key={index}
                className={`menu-item ${selectedMenu === item.id ? 'active' : ''}`}
                onClick={(e) => handleClick(e, () => handleMenuClick(item.id))}
              >
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

        {/* Logout Button with ripple effect */}
        <div className="logout-section">
          <button 
            className="logout-button"
            onClick={(e) => handleClick(e, () => console.log('Logout'))}
          >
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>

        <div className="version-info">
          <p>Phiên bản 1.0.0</p>
        </div>
      </div>

      {/* Right Content Area - Desktop Only */}
      <div className="account-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default AccountPage;