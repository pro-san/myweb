import React, { useEffect } from 'react';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  onClose,
  title = 'Message Sent Successfully!',
  message = 'PRO DIGITAL will contact you shortly on your email or WhatsApp.',
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] max-w-sm w-full bg-white rounded-2xl shadow-2xl border-l-4 border-emerald-500 p-5 flex items-start gap-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <div className="flex-1 pr-2">
        <h4 className="text-sm font-bold text-slate-900 leading-snug">
          {title}
        </h4>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
      >
        <i className="fa-solid fa-xmark text-sm"></i>
      </button>
    </div>
  );
};
