import '../assets/styles/PaymentInfoSection.css';
import { useNavigate } from 'react-router-dom';


function PaymentInfoSection({ 
 
  totalAmount = '160.000 đ' 
}) {
  const navigate = useNavigate();

  const handleAddService = () => {
    // Nếu có venueId và categoryId, truyền vào URL
  
      // Fallback: navigate đến trang services chung
      navigate('/services');
    
  };

  return (
    <div className="payment-info">
      <div className="payment-row">
        <span>Số tiền cần thanh toán</span>
        <span className="payment-amount">{totalAmount}</span>
      </div>
      <button 
        className="add-service-btn" 
        onClick={handleAddService}
      >
        Thêm dịch vụ
      </button>
    </div>
  );
}

export default PaymentInfoSection;