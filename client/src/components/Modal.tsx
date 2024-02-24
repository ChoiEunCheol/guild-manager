// Modal.tsx
import React, { ReactNode, FC, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // 모달 컨텐츠 클릭 이벤트를 중단하여 오버레이 클릭시에만 onClose 함수가 실행되도록 합니다.
  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div onClick={stopPropagation} style={{ backgroundColor: 'white', padding: 20 }}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
