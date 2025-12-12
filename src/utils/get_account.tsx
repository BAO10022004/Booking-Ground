import { authService } from "../services";
import Account from "../models/account";

export async function getAccount(): Promise<Account | null> {
  try {
    if (!authService.isAuthenticated()) {
      return null;
    }

    const user = await authService.getCurrentUser();
    return new Account({
      fullName: user.name,
      email: user.email,
      phoneNumber: user.phone_number,
      password: "",
      userId: user.id,
      gender: user.gender ?? false,
      birthday: user.birthday ? new Date(user.birthday) : new Date(),
      role: user.role ?? false,
      isAdmin: user.is_admin ?? false,
      isActive: user.is_active ?? true,
      avatarId: user.avatar_id || false,
      coverImageId: user.cover_image_id || false,
    });
  } catch (error) {
    console.error("Error fetching account:", error);
    return null;
  }
}

export default GetAccount;
