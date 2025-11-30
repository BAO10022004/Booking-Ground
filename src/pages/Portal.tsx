// src/components/Portal.tsx (hoặc src/utils/Portal.tsx)
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  wrapperId: string; // ID của element sẽ chứa Modal (thường là một div mới tạo)
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const Portal: React.FC<PortalProps> = ({ children, wrapperId = "react-portal-wrapper" }) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    
    // Nếu element chưa tồn tại, tạo mới và thêm vào body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    // Dọn dẹp khi component unmount
    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // Nếu chưa có wrapper, không render gì cả
  if (wrapperElement === null) return null;

  // Render children vào DOM node đã tạo
  return createPortal(children, wrapperElement);
};

export default Portal;