import { useState } from 'react';
import { 
  Calendar, 
  Heart, 
  LogOut,
  Shield,
  HelpCircle,
  FileText,
  Share2
} from 'lucide-react';
import '../assets/styles/AccountPage.css';
import HeaderProfileCard from '../components/HeaderProfileCard';
import Stats from '../components/Stats';
import GetMenuItem from '../utils/get_menuitem';
import acc from '../utils/get_account';
import ButtonMenuItem from '../components/ButtonMenuItem';

function AccountPage() {
  const [user, ] = useState(acc);
  const stats = [
    { label: 'Đã đặt', value: '12', icon: Calendar, color: 'blue' },
    { label: 'Yêu thích', value: '8', icon: Heart, color: 'red' },
    { label: 'Đánh giá', value: '5', icon: '⭐', color: 'yellow' }
  ];
  const supportItems = [
    { title: 'Bảo mật & Quyền riêng tư', icon: Shield, color: 'emerald', action: () => console.log('Privacy')},
    { title: 'Trung tâm trợ giúp', icon: HelpCircle, color: 'blue', action: () => console.log('Help') },
    { title: 'Điều khoản & Chính sách', icon: FileText, color: 'gray', action: () => console.log('Terms') },
    { title: 'Chia sẻ ứng dụng', icon: Share2, color: 'purple', action: () => console.log('Share') }
  ];
  const menuItems = GetMenuItem();
  return (
    <div className="account-page">
      <div className="profile-header">
        
        <HeaderProfileCard user={user} />
        {/* Stats */}
        <Stats stats={stats} />
      </div>

      {/* Menu Items */}
      <div className="menu-section">
        <h3 className="section-title">Tài khoản của tôi</h3>
        <div className="menu-list">
          {menuItems.map((item, index) => (
            <ButtonMenuItem key={index} index={index} item={item} />
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="menu-section">
        <h3 className="section-title">Hỗ trợ</h3>
        <div className="menu-list">
          {supportItems.map((item, index) => (
            <ButtonMenuItem key={index} index={index} item={item} />
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