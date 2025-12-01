import '../assets/styles/PaymentMethodSection.css'

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import MoMoLogo from '../assets/images/MOMO-Logo-App.png'
interface PaymentMethodSectionProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

const paymentMethods = [
  {
    id: 'vnpay',
    name: 'VNPay',
    logo: 'https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg',
    description: 'Thanh toán qua VNPay',
    color: '#0088CC'
  },
  {
    id: 'momo',
    name: 'MoMo',
    logo: MoMoLogo,
    description: 'Ví điện tử MoMo',
    color: '#D82D8B'
  },
  {
    id: 'visa',
    name: 'Visa/Mastercard',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg',
    description: 'Thẻ tín dụng/ghi nợ',
    color: '#1A1F71'
  },
  {
    id: 'cash',
    name: 'Tiền mặt',
    logo: '', // Để trống sẽ hiển thị emoji
    emoji: '💵',
    description: 'Thanh toán tại sân',
    color: '#10b981'
  }
];

function PaymentMethodSection({ selectedMethod, setSelectedMethod }: PaymentMethodSectionProps) {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (methodId: string) => {
    setImageErrors(prev => ({ ...prev, [methodId]: true }));
  };

  return (
    <div className="payment-method-section">
     
      <div className="payment-method-title">
        💳 Chọn hình thức thanh toán
      </div>

      <div className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="payment-method-header">
              <div className="payment-method-logo-container">
                {method.logo && !imageErrors[method.id] ? (
                  <img 
                    src={method.logo} 
                    alt={method.name}
                    className="payment-method-logo"
                    onError={() => handleImageError(method.id)}
                  />
                ) : method.emoji ? (
                  <span className="payment-method-emoji">{method.emoji}</span>
                ) : (
                  <div className="logo-placeholder"></div>
                )}
              </div>
              
              <div className="payment-method-info">
                <div className="payment-method-name">{method.name}</div>
                <div className="payment-method-description">{method.description}</div>
              </div>
            </div>
            
            {selectedMethod === method.id && (
              <div className="payment-method-badge">✓ Đã chọn</div>
            )}

            <CheckCircle 
              className="payment-method-check" 
              size={24}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethodSection