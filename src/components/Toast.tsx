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
  message = 'PRO DIGITAL will contact you shortly on your email or Telegram.',
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
    <div className="fixed bottom-8 right-8 z-[100] max-w-sm w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 p-5 flex items-start gap-4 animate-in slide-in-from-bottom-5 duration-300 transition-colors duration-200">
      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg shrink-0">
        <i className="fa-solid fa-circle-check"></i>
      </div>
      <div className="flex-1 pr-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          {message}
        </p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer transition-colors"
      >
        <i className="fa-solid fa-xmark text-sm"></i>
      </button>
    </div>
  );
};
