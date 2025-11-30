import { Camera, Edit } from "lucide-react";
import user from "../models/account";
import getAvatarForUser from "../utils/get_image";

function HeaderProfileCard({user}: {user: user})
{
    return (
        <div className="profile-header">
        <div className="profile-card">
          <div className="profile-avatar-wrapper">
            <img src={getAvatarForUser(user)} alt={user.fullName} className="profile-avatar" />
            <button className="avatar-edit-button">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="profile-info">
            <h2 className="profile-name">{user.fullName}</h2>
            <p className="profile-email">{user.email}</p>
          </div>

          <button className="profile-edit-button">
            <Edit className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        </div>
        </div>
    )
}
export default HeaderProfileCard;