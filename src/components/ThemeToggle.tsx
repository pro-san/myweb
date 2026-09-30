import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  id?: string;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id = 'theme-toggle',
  className = '',
  showLabel = false,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      id={id}
      data-testid="theme-toggle"
      data-theme={theme}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center gap-2 p-2 rounded-xl transition-all duration-300 cursor-pointer select-none border focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        isDark
          ? 'bg-slate-800/90 hover:bg-slate-750 text-amber-400 border-slate-700 hover:border-amber-400/40 shadow-sm shadow-amber-500/10'
          : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200/80 hover:border-slate-300 shadow-2xs'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <i
          className={`fa-solid fa-sun text-base transition-all duration-300 transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
              : 'opacity-0 -rotate-90 scale-50 absolute pointer-events-none'
          }`}
          aria-hidden="true"
        />

        {/* Moon Icon */}
        <i
          className={`fa-solid fa-moon text-base transition-all duration-300 transform ${
            isDark
              ? 'opacity-0 rotate-90 scale-50 absolute pointer-events-none'
              : 'opacity-100 rotate-0 scale-100 text-slate-700 group-hover:text-blue-600'
          }`}
          aria-hidden="true"
        />
      </div>

      {showLabel && (
        <span className="text-xs font-bold tracking-tight">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
