class Account {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberSince: string;

  constructor({
    name,
    email,
    phone,
    address,
    avatar,
    memberSince,
  }: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
    memberSince: string;
  }) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.avatar = avatar;
    this.memberSince = memberSince;
  }
}
export default Account;