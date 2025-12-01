
import '../assets/styles/TermsInfoSection.css';
function TermsInfoSection() {
    return (
        <>
            <div className="notice-section">
                <div className="notice-title">Lưu ý:</div>
                <ul className="notice-list">
                    <li>Việc thanh toán được thực hiện trực tiếp giữa bạn và chủ sân.</li>
                    <li>Booking Ground đóng vai trò kết nối, hỗ trợ bạn tìm và đặt sân dễ dàng hơn.</li>
                    <li>Mỗi sân có thể có quy định và chính sách riêng, hãy dành chút thời gian đọc kỹ để đảm bảo quyền lợi cho bạn nhé!</li>
                </ul>
            </div>
            <div className="terms-section">
                Bằng việc bấm Xác nhận và Thanh toán, bạn xác nhận đã đọc và đồng ý với{' '}
                <a href="#" className="terms-link">Điều khoản đặt sân</a>
                {' và '}
                <a href="#" className="terms-link">Chính sách hoàn tiền và hủy lịch</a>.
            </div>
        </>
    )
}
export default TermsInfoSection;