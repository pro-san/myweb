import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenRetroArcade?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRetroArcade }) => {
  const { t, language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand */}
        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          {PERSONAL_INFO.name}
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
          {isKhmer ? 'វិស្វករអភិវឌ្ឍន៍វេបសាយ Full-Stack & ប្រព័ន្ធស្វ័យប្រវត្តិកម្ម' : PERSONAL_INFO.title}
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <a
            href={PERSONAL_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-[#24A1DE] text-white flex items-center justify-center text-lg transition-all duration-200 hover:-translate-y-1 shadow-sm"
            aria-label="Telegram Chat"
          >
            <i className="fa-brands fa-telegram"></i>
          </a>
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center text-lg transition-all duration-200 hover:-translate-y-1 shadow-sm"
            aria-label="GitHub Profile"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center text-lg transition-all duration-200 hover:-translate-y-1 shadow-sm"
            aria-label="Send Email"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-400 mb-8 border-y border-slate-900 py-4 max-w-4xl mx-auto">
          <a href="#services" className="hover:text-white transition-colors">
            {t('nav_services')}
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            {t('nav_projects')}
          </a>
          <a href="#code-lab" className="hover:text-white transition-colors text-blue-400">
            {t('nav_code_lab')}
          </a>
          <a href="#roi-calculator" className="hover:text-white transition-colors text-emerald-400">
            {t('nav_roi')}
          </a>
          <a href="#client-portal" className="hover:text-white transition-colors text-indigo-400">
            {t('nav_portal')}
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            {t('nav_skills')}
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            {t('nav_process')}
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            {t('nav_about')}
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            {t('nav_faq')}
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            {t('nav_contact')}
          </a>
        </div>

        {/* Copyright notice */}
        <p className="text-xs text-slate-500 m-0 leading-relaxed">
          &copy; 2026 <strong className="text-slate-300 font-bold">PRO DIGITAL</strong>. {isKhmer ? 'កសាងឡើងដោយភាពជាក់លាក់ និងកូដស្អាត។ រក្សាសិទ្ធិគ្រប់យ៉ាង។' : 'Built with precision & clean code. All Rights Reserved.'}
        </p>

        {/* Secret Konami Code Easter Egg Trigger */}
        {onOpenRetroArcade && (
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={onOpenRetroArcade}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition-all duration-200 cursor-pointer shadow-2xs group"
              title="Secret Easter Egg: Type ↑ ↑ ↓ ↓ ← → ← → B A on your keyboard or click here to play!"
            >
              <span className="text-cyan-400 group-hover:scale-125 transition-transform">👾</span>
              <span>Konami Code:</span>
              <span className="text-slate-500 group-hover:text-cyan-300 font-bold tracking-wider">↑ ↑ ↓ ↓ ← → ← → B A</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
};
