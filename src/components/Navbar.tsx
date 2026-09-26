import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

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
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white shadow-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-extrabold text-blue-600 text-xl tracking-tight border-r-2 border-blue-600 pr-2.5 mr-1 group-hover:text-blue-700 transition-colors">
              FBMPrime
            </span>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-blue-900 transition-colors">
              PRO DIGITAL
            </span>
            <span className="hidden md:inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 ml-1.5 border border-blue-200">
              Full-Stack Dev & Automation
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-semibold text-slate-700">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-600 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {onOpenEstimator && (
                <li>
                  <button
                    onClick={onOpenEstimator}
                    className="text-amber-600 hover:text-amber-700 flex items-center gap-1.5 cursor-pointer font-bold"
                  >
                    <i className="fa-solid fa-calculator text-amber-500"></i>
                    <span>Quote Estimator</span>
                  </button>
                </li>
              )}
            </ul>

            {/* Hire Me CTA Button */}
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
                PERSONAL_INFO.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb956] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
                PERSONAL_INFO.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow"
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
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
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 mt-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-3 font-semibold text-slate-800">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
                  className="w-full text-left py-2 px-3 rounded-lg bg-amber-50 text-amber-800 font-bold flex items-center gap-2"
                >
                  <i className="fa-solid fa-calculator text-amber-500"></i>
                  <span>Instant Project Cost Estimator</span>
                </button>
              </li>
            )}
            <li className="pt-2">
              <a
                href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
                  PERSONAL_INFO.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl shadow"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i>
                <span>Direct WhatsApp Chat</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
