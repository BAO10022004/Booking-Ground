import Account from '../models/account';

export function GetAccount() {
    return new Account({
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phoneNumber: '0123 456 789',
    password: 'password123',
    userId: 'user-001',
    gender: true,
    birthday: new Date('1990-01-01'),
    role: false,
    isAdmin: false, 
    isActive: true,
    avatarId: false,
    coverImageId: false,
   })
  // return null;
}
export default GetAccount();