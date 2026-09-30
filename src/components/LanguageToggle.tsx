import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { language, toggleLanguage } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isKhmer ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ (Switch to Khmer)'}
      title={isKhmer ? 'Switch to English' : 'ប្តូរទៅភាសាខ្មែរ (Switch to Khmer)'}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all duration-300 cursor-pointer select-none border font-bold text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isKhmer
          ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 shadow-2xs ring-1 ring-blue-400/20'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 shadow-2xs'
      } ${className}`}
    >
      <span className="text-sm select-none" aria-hidden="true">
        {isKhmer ? '🇰🇭' : '🇬🇧'}
      </span>
      <span className="tracking-tight uppercase font-extrabold text-[11px]">
        {isKhmer ? 'ខ្មែរ' : 'EN'}
      </span>
      {showLabel && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium ml-0.5">
          ({isKhmer ? 'Khmer' : 'English'})
        </span>
      )}
    </button>
  );
};
