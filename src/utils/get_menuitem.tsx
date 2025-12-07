import { 
  User, 
  Settings, 
  Heart, 
  Clock, 
  CreditCard, 
  Bell
} from 'lucide-react';

const menuItems = [
    { 
      id : 1,
      title: 'Thông tin cá nhân', 
      icon: User, 
      color: 'emerald',
      action: () => console.log('Edit profile')
    },
    { 
          id : 2,
      title: 'Lịch sử đặt sân', 
      icon: Clock, 
      color: 'blue',
      badge: '3',
      action: () => console.log('History')
    },
    { 
          id : 3,
      title: 'Sân yêu thích', 
      icon: Heart, 
      color: 'red',
      badge: '8',
      action: () => console.log('Favorites')
    },
    { 
          id : 4,
      title: 'Phương thức thanh toán', 
      icon: CreditCard, 
      color: 'purple',
      action: () => console.log('Payment')
    },
    { 
          id : 5,
      title: 'Thông báo', 
      icon: Bell, 
      color: 'orange',
      action: () => console.log('Notifications')
    },
    { 
          id : 6,
      title: 'Cài đặt', 
      icon: Settings, 
      color: 'gray',
      action: () => console.log('Settings')
    }
  ];
function GetMenuItem() {
  return menuItems;
}
export default GetMenuItem; 