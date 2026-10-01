import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenEstimator?: () => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenResume }) => {
  const { t, language } = useLanguage();
  const isKhmer = language === 'km';

  const dynamicWordsEn = [
    'high-speed web applications.',
    'custom SaaS management portals.',
    'automated workflow bots.',
    '100% offline database systems.',
    'scalable REST & telephony APIs.',
  ];

  const dynamicWordsKm = [
    'កម្មវិធីវេបសាយល្បឿនលឿន។',
    'ប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម SaaS។',
    'Bot ស្វ័យប្រវត្តិកម្មឆ្លាតវៃ។',
    'ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យក្រៅបណ្តាញ។',
    'ប្រព័ន្ធតភ្ជាប់ API ទំនើប។',
  ];

  const dynamicWords = isKhmer ? dynamicWordsKm : dynamicWordsEn;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = dynamicWords[currentWordIndex % dynamicWords.length];
    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === fullWord.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setDisplayText(fullWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, dynamicWords]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#162b50] text-white pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Decorative background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.3)_0%,rgba(30,60,114,0)_70%)] pointer-events-none"></div>

      {/* Decorative wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-10 md:h-14 bg-slate-50 dark:bg-slate-950 transition-colors duration-200 [clip-path:polygon(0_100%,100%_100%,100%_0)]"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs sm:text-sm font-bold mb-6 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{t('hero_badge')}</span>
        </div>

        {/* Profile Avatar with status beacon */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
          <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping opacity-60"></div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-2xl border-3 border-white/90 ring-4 ring-blue-400/30 bg-slate-900">
            <img
              src="/profile.png"
              alt="PRO DIGITAL"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://lh3.googleusercontent.com/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K';
              }}
            />
          </div>
          <span
            className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-md flex items-center justify-center text-[10px] text-slate-950 font-bold"
            title="Available for Contracts"
          >
            ✓
          </span>
        </div>

        {/* Name & Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          {t('hero_greeting')} <span className="text-white drop-shadow-sm">PRO DIGITAL</span>
        </h1>

        <h2 className="text-lg sm:text-2xl font-bold text-sky-300 mb-6 tracking-wide">
          {PERSONAL_INFO.title}
        </h2>

        {/* Dynamic Typing Subtitle */}
        <div className="text-base sm:text-xl font-medium text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed min-h-[3.5rem] flex items-center justify-center">
          <p>
            {isKhmer ? 'ខ្ញុំកសាង ' : 'I build '}
            <span className="text-amber-300 font-semibold border-b-2 border-amber-400/50 pb-0.5">
              {displayText}
            </span>
            <span className="animate-pulse text-amber-400 font-bold ml-0.5">|</span>
          </p>
        </div>

        {/* Bio paragraph */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed opacity-95">
          {t('hero_description')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 bg-white text-blue-900 hover:bg-slate-100 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-laptop-code text-blue-600"></i>
            <span>{t('hero_btn_projects')}</span>
          </a>

          <a
            href="#code-lab"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-blue-400/40"
          >
            <i className="fa-solid fa-terminal text-emerald-400"></i>
            <span>{t('hero_btn_codelab')}</span>
          </a>

          <a
            href={PERSONAL_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-pulse-glow inline-flex items-center gap-2.5 bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-xl shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <i className="fa-brands fa-telegram text-xl"></i>
            <span>{t('nav_telegram')}</span>
          </a>

          {onOpenEstimator && (
            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
            >
              <i className="fa-solid fa-calculator text-amber-400"></i>
              <span>{t('hero_btn_estimator')}</span>
            </button>
          )}

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full transition-all duration-300 cursor-pointer"
            >
              <i className="fa-solid fa-file-invoice text-sky-300"></i>
              <span>{t('hero_btn_cv')}</span>
            </button>
          )}
        </div>

        {/* Tech Badges Row */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-200">
          <span className="text-slate-400 mr-2 text-xs uppercase tracking-wider">{isKhmer ? 'ជំនាញស្នូល៖' : 'Core Arsenal:'}</span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
            <i className="fa-brands fa-react text-cyan-400"></i> React 19
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
            <i className="fa-brands fa-python text-blue-400"></i> Python 3.11
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
            <i className="fa-brands fa-node-js text-emerald-400"></i> Node.js
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
            <i className="fa-solid fa-database text-sky-400"></i> SQLite WAL
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-1.5">
            <i className="fa-solid fa-robot text-purple-400"></i> Anti-Detect Bots
          </span>
        </div>
      </div>
    </section>
  );
};

