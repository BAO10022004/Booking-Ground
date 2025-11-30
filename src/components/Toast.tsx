// Toast.tsx
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import '../assets/styles/Toast.css';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const icons = {
    success: <CheckCircle className="toast-icon" />,
    error: <XCircle className="toast-icon" />,
    warning: <AlertCircle className="toast-icon" />,
    info: <Info className="toast-icon" />
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        <div className={`toast-icon-wrapper toast-icon-${type}`}>
          {icons[type]}
        </div>
        <div className="toast-content">
          <p className="toast-message">{message}</p>
        </div>
        <button onClick={onClose} className="toast-close-btn">
          <XCircle className="toast-close-icon" />
        </button>
      </div>
    </div>
  );
};

export default Toast;