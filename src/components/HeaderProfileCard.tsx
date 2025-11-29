import { Camera, Edit } from "lucide-react";

interface HeaderProfileCardProps {
    user: {
        name: string;
        email: string;
        avatar: string;
        memberSince: string;
    };
}


function HeaderProfileCard({user}: HeaderProfileCardProps)
{
    return (
        <div className="profile-header">
        <div className="profile-card">
          <div className="profile-avatar-wrapper">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
            <button className="avatar-edit-button">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-member">Thành viên từ {user.memberSince}</p>
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