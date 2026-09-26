import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const FloatingWhatsApp: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Trigger slide-up entrance shortly after page mount
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center group transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        hasEntered
          ? 'translate-y-0 opacity-100'
          : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      {/* Animated Tooltip */}
      <div
        role="tooltip"
        className="relative mr-3 px-4 py-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white text-xs shadow-2xl border border-slate-700/70 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 ease-out whitespace-nowrap flex items-center gap-3 select-none"
      >
        {/* Pulsing Status Dot */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-extrabold uppercase tracking-wider text-[10px]">
            Online
          </span>
        </div>

        {/* Text Content */}
        <div className="border-l border-slate-700/80 pl-2.5 text-left">
          <div className="text-slate-100 font-bold text-xs flex items-center gap-1.5">
            <span>Chat with PRO DIGITAL</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
          </div>
          <div className="text-slate-400 text-[10px] font-medium leading-tight">
            Instant quote &amp; project consultation
          </div>
        </div>

        {/* Tooltip caret pointing towards the button */}
        <div
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 rotate-45 border-t border-r border-slate-700/70"
          aria-hidden="true"
        ></div>
      </div>

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
          PERSONAL_INFO.whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1eb956] text-white flex items-center justify-center text-3xl shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        title="Chat with PRO DIGITAL on WhatsApp"
        aria-label="Direct WhatsApp Message to PRO DIGITAL"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  );
};
