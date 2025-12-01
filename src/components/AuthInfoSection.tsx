import '../models/account'
import type Account from '../models/account';
import '../assets/styles/AuthInfoSection.css';
function AuthInfoSection({account,setIsLogin, isLogin}:{account:Account,setIsLogin: (isLogin: boolean) => void, isLogin:boolean}) {
    if(account){
        return null;
    }
    return (
       
            <div className="auth-section">
                <p className="auth-subtitle">Đăng nhập để có thể sử dụng ưu đãi</p>
                    <div className="auth-tabs">
                        <button 
                        className={`auth-tab ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                        >
                        ĐĂNG NHẬP
                        </button>
                        <button 
                        className={`auth-tab ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                        >
                        ĐĂNG KÝ
                        </button>
                    </div>
            </div>
    )
}
export default AuthInfoSection;