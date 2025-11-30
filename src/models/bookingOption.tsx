class BookingOption {
  id: string;
  title: string;
  desription: string;
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
    this.id = name;
    this.title = email;
    this.desription = phone;
    this.address = address;
    this.avatar = avatar;
    this.memberSince = memberSince;
  }
}
export default BookingOption;