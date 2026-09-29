import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const FloatingTelegram: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const hasPlayedPingRef = useRef(false);

  useEffect(() => {
    // Trigger slide-up entrance shortly after page mount
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const playSubtlePingSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Primary gentle ping tone (B5 to E6 melodic sparkle)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.06);

      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      // Soft harmonic chime overtone for pleasant warmth
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1975.53, now);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(0.035, now + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 0.35);
      osc2.stop(now + 0.25);

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 400);
    } catch {
      // Audio playback fails gracefully if muted or disabled by browser policy
    }
  };

  const handleHoverFirstTime = () => {
    if (!hasPlayedPingRef.current) {
      hasPlayedPingRef.current = true;
      playSubtlePingSound();
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center group transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        hasEntered
          ? 'translate-y-0 opacity-100'
          : 'translate-y-24 opacity-0 pointer-events-none'
      }`}
      onMouseEnter={handleHoverFirstTime}
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
            <span>Telegram Chat</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-sky-400"></i>
          </div>
          <div className="text-slate-400 text-[10px] font-medium leading-tight">
            Chat with PRO DIGITAL directly
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
        href={PERSONAL_INFO.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#24A1DE] hover:bg-[#1e88be] text-white flex items-center justify-center text-3xl shadow-2xl shadow-sky-500/30 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-sky-400/40"
        title="Chat with PRO DIGITAL on Telegram"
        aria-label="Direct Telegram Chat with PRO DIGITAL"
      >
        <i className="fa-brands fa-telegram"></i>
      </a>
    </div>
  );
};
