import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const QualitySection: React.FC = () => {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section className="py-20 bg-slate-900 text-white border-t border-b border-slate-800 relative overflow-hidden">
      {/* Dark grid background pattern */}
      <div className="absolute inset-0 dark-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-extrabold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1 mb-3">
            <i className="fa-solid fa-shield-halved"></i>
            <span>{isKhmer ? 'ការធានាអត្រាក្រាំង ០% (Zero Crash)' : 'Zero Crash Guarantee'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {isKhmer ? 'គុណភាពកូដ និងការតេស្ត QA យ៉ាងហ្មត់ចត់' : 'Code Quality & Strict QA Testing'}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-emerald-400 rounded mx-auto mb-4"></div>
          <p className="text-slate-400 text-base sm:text-lg">
            {isKhmer
              ? 'ខ្ញុំមិនគ្រាន់តែសរសេរកូដនោះទេ ខ្ញុំបង្កើតប្រព័ន្ធដែលមានស្ថិរភាពខ្ពស់ និងរឹងមាំបំផុត។ គ្រប់គម្រោងសុទ្ធតែឆ្លងកាត់ការធ្វើតេស្តសាកល្បងសម្ពាធមុនពេលដាក់ឱ្យដំណើរការ។'
              : "I don't just write code; I engineer reliable, resilient systems. Every project undergoes rigorous end-to-end stress testing prior to deployment."}
          </p>
        </div>

        {/* 3 Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-slate-800/60 border border-slate-700/70 hover:border-emerald-500/50 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-5 border border-emerald-500/20">
                <i className="fa-solid fa-bug-slash"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isKhmer ? 'ការតេស្តស្វ័យប្រវត្តិ' : 'Automated Testing'}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {isKhmer
                  ? 'ការប្រើប្រាស់ Selenium, Playwright និង Postman API testing ដើម្បីក្លែងធ្វើការប្រើប្រាស់របស់មនុស្សរាប់ពាន់នាក់ក្នុងពេលតែមួយ និងទប់ស្កាត់បញ្ហាជាមុន។'
                  : 'Using Selenium, Playwright, and Postman API testing to simulate thousands of concurrent user interactions and preemptively catch edge cases.'}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-700/50 text-[11px] font-mono text-emerald-400">
              {isKhmer ? 'ការតេស្ត៖ Unit, Integration & E2E' : 'Coverage: Unit, Integration & E2E'}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-800/60 border border-slate-700/70 hover:border-sky-500/50 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-3xl mx-auto mb-5 border border-sky-500/20">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isKhmer ? 'សុវត្ថិភាព និងការការពារ' : 'Security & Protection'}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {isKhmer
                  ? 'ការពារជាស្រេចពីការវាយប្រហារ SQL injection, XSS vulnerabilities, ការកំណត់កម្រិតហៅ API តឹងរ៉ឹង និងការក្លែងបន្លំ Browser Fingerprint យ៉ាងជ្រៅ។'
                  : 'Built-in protection against SQL injection, XSS vulnerabilities, strict API rate-limiting, and deep browser fingerprint obfuscation for web scrapers.'}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-700/50 text-[11px] font-mono text-sky-400">
              {isKhmer ? 'សុវត្ថិភាព៖ Sanitized Inputs & Token Guards' : 'Sanitized Inputs & Token Guards'}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/50 rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-3xl mx-auto mb-5 border border-amber-500/20">
                <i className="fa-solid fa-server"></i>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {isKhmer ? 'ការវាស់ស្ទង់ល្បឿន និងប្រសិទ្ធភាព' : 'Performance Profiling'}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {isKhmer
                  ? 'ការបង្កើនប្រសិទ្ធភាព Database ជាមួយ SQLite WAL Concurrency និងការត្រួតពិនិត្យ Memory Leak ដើម្បីធានាអត្រាក្រាំង ០% ទោះបីផ្ទុកទិន្នន័យច្រើនក៏ដោយ។'
                  : 'Database query optimization with SQLite WAL concurrency and memory leak audits to guarantee 0% crash rates under heavy commercial data traffic.'}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-700/50 text-[11px] font-mono text-amber-400">
              {isKhmer ? 'កម្រិតស្តង់ដារ៖ Query <20ms & ក្រាំង 0%' : 'Benchmark: <20ms Queries & 0% Crashes'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
