"use client";

import { createPortal } from 'react-dom';

// Render children into a body-attached portal synchronously to avoid missing overlay frames.
const getOrCreateModalRoot = () => {
  if (typeof document === 'undefined') return null;
  let modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }
  return modalRoot;
};

const ModalPortal = ({ children }) => {
  if (typeof document === 'undefined') return null;
  const container = getOrCreateModalRoot();
  if (!container) return null;
  return createPortal(children, container);
};

export default ModalPortal;
