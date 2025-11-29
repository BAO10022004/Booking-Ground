import Account from '../models/account';

export function GetAccount() {
    return new Account({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123 456 789',
    address: 'TP. Hồ Chí Minh',
    avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=10b981&color=fff&size=200',
    memberSince: 'Tháng 1, 2024'
  })
}
export default GetAccount();