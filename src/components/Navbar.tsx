import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenEstimator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Code Lab', href: '#code-lab' },
    { label: 'Skills', href: '#skills' },
    { label: 'Process', href: '#process' },
    { label: 'About Me', href: '#about' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-slate-200/80 dark:border-slate-800 py-3'
          : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm shadow-xs border-transparent dark:border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-xl tracking-tight border-r-2 border-blue-600 dark:border-blue-400 pr-2.5 mr-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              FBMPrime
            </span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 text-lg tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              PRO DIGITAL
            </span>
            <span className="hidden md:inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 ml-1.5 border border-blue-200 dark:border-blue-800">
              Full-Stack Dev &amp; Automation
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5">
            <ul className="flex items-center gap-5 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 hover:after:w-full after:transition-all after:duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {onOpenEstimator && (
                <li>
                  <button
                    onClick={onOpenEstimator}
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
                  >
                    <i className="fa-solid fa-calculator text-amber-500"></i>
                    <span>Estimator</span>
                  </button>
                </li>
              )}
            </ul>

            {/* Dark Mode Toggle Button */}
            <ThemeToggle />

            {/* Telegram Chat CTA Button */}
            <a
              href={PERSONAL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <i className="fa-brands fa-telegram text-base"></i>
              <span>Telegram Chat</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {/* Theme Toggle (Mobile) */}
            <ThemeToggle />

            <a
              href={PERSONAL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold text-xs px-3 py-1.5 rounded-full shadow transition-all duration-200"
            >
              <i className="fa-brands fa-telegram"></i>
              <span className="hidden sm:inline">Telegram Chat</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle navigation"
            >
              <i
                className={`fa-solid ${
                  mobileMenuOpen ? 'fa-xmark' : 'fa-bars'
                } text-xl`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 mt-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-2.5 font-semibold text-slate-800 dark:text-slate-200">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {onOpenEstimator && (
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEstimator();
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold flex items-center gap-2 border border-amber-200/60 dark:border-amber-800/40"
                >
                  <i className="fa-solid fa-calculator text-amber-500"></i>
                  <span>Instant Project Cost Estimator</span>
                </button>
              </li>
            )}
            <li className="pt-2 flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Appearance Theme
              </span>
              <ThemeToggle showLabel />
            </li>
            <li className="pt-1">
              <a
                href={PERSONAL_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold py-3 rounded-xl shadow transition-colors"
              >
                <i className="fa-brands fa-telegram text-xl"></i>
                <span>Direct Telegram Chat</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
