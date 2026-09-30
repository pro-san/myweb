import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col transition-colors duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-file-lines"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                {isKhmer ? 'ប្រវត្តិរូបបច្ចេកទេស និងព័ត៌មានវិស្វករ' : 'Developer Executive Factsheet & Technical CV'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                PRO DIGITAL • {PERSONAL_INFO.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print CV"
            >
              <i className="fa-solid fa-print"></i>
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* CV Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 text-slate-800 dark:text-slate-200">
          {/* Top Bio Banner */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                PRO DIGITAL ({PERSONAL_INFO.brandName})
              </h2>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                Full-Stack Web Developer &amp; Automation Systems Engineer
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <span><i className="fa-solid fa-location-dot text-rose-500 mr-1"></i> Pakistan (Serving Global Clients)</span>
                <span><i className="fa-solid fa-clock text-amber-500 mr-1"></i> 3+ Years Commercial Coding</span>
                <span><i className="fa-solid fa-globe text-emerald-500 mr-1"></i> English / International</span>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <a
                href={PERSONAL_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#24A1DE] text-white text-xs font-bold text-center flex items-center gap-1.5"
              >
                <i className="fa-brands fa-telegram"></i> Telegram
              </a>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold text-center flex items-center gap-1.5"
              >
                <i className="fa-brands fa-github"></i> GitHub
              </a>
            </div>
          </div>

          {/* Core Specialization */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-2">
              Executive Technical Summary
            </h4>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Specialized systems architect with 3+ years engineering production-grade software applications. Proven track record deploying 100% offline desktop applications with zero-data-loss SQLite Write-Ahead-Logging (WAL), low-latency web microservices (Node.js, Python Flask/FastAPI), and high-throughput multi-threaded automation bots with dynamic browser fingerprint evasion. Experienced in remote sales management and international marketplace scaling (over 10M+ organic reach).
            </p>
          </div>

          {/* Technical Arsenal Grid */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
              Technical Stack &amp; Proficiency
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <i className="fa-brands fa-python text-blue-500"></i> Python &amp; Flask
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Advanced • 3+ Yrs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <i className="fa-brands fa-react text-cyan-400"></i> React &amp; TypeScript
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Advanced • 3+ Yrs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <i className="fa-solid fa-database text-sky-500"></i> SQLite WAL Mode
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Expert • Concurrency</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <i className="fa-solid fa-robot text-purple-500"></i> Selenium &amp; Bots
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Advanced • Anti-Detect</div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider mb-3">
              Key Engineering Milestones
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm">
                <div className="flex justify-between items-center font-bold text-slate-900 dark:text-slate-100">
                  <span>Hostel Management System (Offline Property SaaS)</span>
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400">1,000+ Active Beds</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                  Engineered standalone offline software with sub-15ms local query speeds and automatic thermal/A4 receipt rendering, saving hostel managers 95% of manual administrative accounting.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm">
                <div className="flex justify-between items-center font-bold text-slate-900 dark:text-slate-100">
                  <span>FBM Prime Bot (High-Throughput E-Commerce Automation)</span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">10M+ Organic Reach</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                  Developed multi-threaded automation bot featuring canvas fingerprint cloaking and dynamic proxy rotations, eliminating repetitive browser operations for digital agencies.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Service Guarantees */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm">
            <div className="font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-blue-600 dark:text-blue-400"></i>
              <span>Professional Standards Guaranteed on Every Project</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs text-slate-700 dark:text-slate-300">
              <div>✓ 100% Full Source Code &amp; IP Transfer</div>
              <div>✓ Unconditional 30-Day Bug Warranty</div>
              <div>✓ Daily Asynchronous Telegram Updates</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Direct Email: <strong className="text-slate-700 dark:text-slate-300">{PERSONAL_INFO.email}</strong>
          </span>
          <a
            href={PERSONAL_INFO.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <i className="fa-brands fa-telegram text-base"></i>
            <span>Schedule Project Call on Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
