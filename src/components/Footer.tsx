import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand */}
        <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
          {PERSONAL_INFO.name}
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
          {PERSONAL_INFO.title}
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
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 mb-8 border-y border-slate-900 py-4 max-w-2xl mx-auto">
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#code-lab" className="hover:text-white transition-colors text-blue-400">
            Code Lab
          </a>
          <a href="#skills" className="hover:text-white transition-colors">
            Skills
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            About Me
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Copyright notice */}
        <p className="text-xs text-slate-500 m-0 leading-relaxed">
          &copy; 2026 <strong className="text-slate-300 font-bold">PRO DIGITAL</strong>. Built with precision &amp; clean code. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
