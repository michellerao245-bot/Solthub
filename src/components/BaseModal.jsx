import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const BaseModal = ({ isOpen, onClose, title, subtitle, children }) => {
  const modalRef = useRef(null);
  const triggerElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerElementRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 w-screen h-[100dvh] bg-[#040914]/94 backdrop-blur-xl flex items-center justify-center z-[999999] p-5 box-border [animation:wpFadeIn_0.22s_cubic-bezier(0.16,1,0.3,1)_forwards] will-change-[opacity]"
      onClick={onClose}
    >
      <style>{`
        .solthub-modal-scroll::-webkit-scrollbar { width: 6px; }
        .solthub-modal-scroll::-webkit-scrollbar-track { background: #070d19; }
        .solthub-modal-scroll::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.2); border-radius: 10px; }
        .solthub-modal-scroll::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
        @keyframes wpFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes wpScaleUp { from { opacity: 0; transform: scale(0.96) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .fixed, .solthub-modal-content { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div
        ref={modalRef}
        className="solthub-modal-content solthub-modal-scroll w-full max-w-[950px] max-h-[calc(100dvh-60px)] bg-[#070d19] border border-cyan-500/25 rounded-[24px] overflow-y-auto px-6 md:px-10 py-10 relative box-border shadow-[0_0_60px_rgba(34, 211, 238, 0.05)] outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 [animation:wpScaleUp_0.28s_cubic-bezier(0.34,1.56,0.64,1)_forwards] will-change-[transform,opacity]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabIndex={0}
      >
        {/* Reusable Close Cross System */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.02] border border-white/[0.05] text-slate-400 text-2xl cursor-pointer transition-all duration-200 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Modal Dynamic Header block */}
        <div className="text-center mb-9 border-b border-white/[0.05] pb-5">
          {subtitle && <span className="text-amber-500 text-xs font-bold uppercase tracking-[3px]">{subtitle}</span>}
          <h2 className="text-2xl md:text-3xl text-white font-black tracking-wide mt-1.5">{title}</h2>
        </div>

        {/* Content Injector */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default BaseModal;