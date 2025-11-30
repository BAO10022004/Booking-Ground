import user from "../models/account";
import Image from "../models/Image";


function getAvatarForUser(user: user) {
    return 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=10b981&color=fff&size=200'
}
export default getAvatarForUser;