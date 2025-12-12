import Account from "../models/account";
import { getImageUrl, getFullImageUrl } from "./helpers/imageHelpers";
import { imageService } from "../services";

/**
 * Lấy URL avatar cho user
 * Nếu có avatar_id, sử dụng image service
 * Nếu không, tạo avatar từ tên user bằng ui-avatars
 */
export async function getAvatarForUserAsync(
  user: Account,
  avatarId?: string | null
): Promise<string> {
  if (avatarId) {
    try {
      const image = await imageService.getImage(avatarId);
      return getFullImageUrl(image.image_url || image.url || "");
    } catch (error) {
      console.warn("Failed to load user avatar:", error);
    }
  }
  // Fallback: tạo avatar từ tên
  return getAvatarForUser(user);
}

/**
 * Lấy URL avatar từ tên user (fallback)
 */
export function getAvatarForUser(user: Account): string {
  const name = encodeURIComponent(user.fullName || "User");
  return `https://ui-avatars.com/api/?name=${name}&background=10b981&color=fff&size=200`;
}

export default getAvatarForUser;
