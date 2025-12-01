import '../assets/styles/PaymentInfoSection.css';

function PaymentInfoSection() {
    return (
        <div className="payment-info">
          <div className="payment-row">
            <span>Số tiền cần thanh toán</span>
            <span className="payment-amount">160.000 đ</span>
          </div>
          <button className="add-service-btn">Thêm dịch vụ</button>
        </div>
    )
}
export default PaymentInfoSection;