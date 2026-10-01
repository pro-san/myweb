import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  return (
    <section id="about" className="py-20 my-6 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-200">
      {/* Decorative Blur Blobs */}
      <div className="absolute w-96 h-96 -top-20 -left-20 bg-blue-400/10 rounded-full blur-3xl pointer-events-none animate-float-blob"></div>
      <div className="absolute w-80 h-80 -bottom-16 -right-16 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-float-blob"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 rounded-full px-4 py-1">
              {isKhmer ? 'ប្រវត្តិ និងបទពិសោធន៍' : 'MY BACKGROUND'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 rounded-full px-3 py-1 shadow-2xs">
              <i className="fa-regular fa-clock text-blue-500"></i>
              <span>{isKhmer ? 'រយៈពេលអាន ~២ នាទី' : 'Estimated read: 2 min'}</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            {isKhmer ? 'អំពីខ្ញុំ និងជំនាញឯកទេស' : 'About Me & Expertise'}
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-700 to-emerald-500 rounded mx-auto mb-4"></div>
        </div>

        {/* Card Box */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 dark:from-blue-400 dark:via-sky-300 dark:to-emerald-400 bg-clip-text text-transparent">
                {isKhmer ? 'វិស្វកម្មដំណោះស្រាយដែលពង្រីកបាន និងបង្កើនចំណូល' : 'Engineering Solutions That Scale & Convert'}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {isKhmer ? (
                  <>
                    មានមូលដ្ឋាននៅរាជធានីភ្នំពេញ ប្រទេសកម្ពុជា ខ្ញុំជាវិស្វករ <strong className="text-slate-900 dark:text-white font-bold">Full-Stack Web Developer</strong> និងជា <strong className="text-slate-900 dark:text-white font-bold">Automation Systems Architect</strong>។ តាំងពីឆ្នាំ 2023 មក ខ្ញុំបានកសាងកម្មវិធីវេបសាយល្បឿនលឿន ប្រព័ន្ធទិន្នន័យក្រៅបណ្តាញ និង Bot ស្វ័យប្រវត្តិកម្មសម្រាប់អាជីវកម្មនៅសហរដ្ឋអាមេរិក កាណាដា និងទូទាំងពិភពលោក។
                  </>
                ) : (
                  <>
                    Based in Cambodia (St2002, Phnom Penh), I am a results-driven{' '}
                    <strong className="text-slate-900 dark:text-white font-bold">
                      Full-Stack Web Developer
                    </strong>{' '}
                    and{' '}
                    <strong className="text-slate-900 dark:text-white font-bold">
                      Automation Systems Architect
                    </strong>
                    . Since 2023, I have been building high-performance web portals, standalone offline databases, and automated background bots for businesses across the US, Canada, and globally.
                  </>
                )}
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {isKhmer ? (
                  <>
                    ខ្ញុំនាំមកនូវបទពិសោធន៍ទូលំទូលាយ៖ ធ្លាប់គ្រប់គ្រងក្រុមលក់ពីចម្ងាយ ពង្រីកប្រតិបត្តិការលើទីផ្សារអន្តរជាតិ និងបានជំរុញការទស្សនាលើប្រព័ន្ធឌីជីថលជាង{' '}
                    <strong className="text-blue-700 dark:text-blue-400 font-bold">១០ លានដង (Organic Views)</strong>។ ទស្សនវិស័យអាជីវកម្មស៊ីជម្រៅនេះធានាថា រាល់កម្មវិធីដែលខ្ញុំបង្កើតគឺផ្តោតលើប្រាក់ចំណេញពិតប្រាកដ ល្បឿនរហ័ស និងបទពិសោធន៍អ្នកប្រើប្រាស់ដ៏ល្អឥតខ្ចោះ។
                  </>
                ) : (
                  <>
                    I bring unique cross-functional experience: having managed remote sales teams, scaled international marketplace operations, and driven digital reach to over{' '}
                    <strong className="text-blue-700 dark:text-blue-400 font-bold">10 Million organic views</strong>
                    . This deep business perspective ensures that every application I engineer is optimized for real revenue, lightning speed, and flawless user experience.
                  </>
                )}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={PERSONAL_INFO.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-400 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 text-xs font-bold shadow-2xs flex items-center gap-2 transition-colors group"
                  title="View Cambodia Office on Google Maps"
                >
                  <i className="fa-solid fa-location-dot text-rose-500 group-hover:scale-110 transition-transform"></i>
                  <span>{isKhmer ? 'កម្ពុជា (ផ្លូវ 2002 ភ្នំពេញ)' : 'Cambodia (St2002, Phnom Penh)'}</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
                </a>
                <span className="px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs flex items-center gap-2">
                  <i className="fa-solid fa-globe text-blue-600 dark:text-blue-400"></i>
                  <span>{isKhmer ? 'អតិថិជនអន្តរជាតិ (US, CA, UK)' : 'Global Clients (US, CA, UK)'}</span>
                </span>
                <span className="px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs flex items-center gap-2">
                  <i className="fa-solid fa-users-gear text-emerald-600 dark:text-emerald-400"></i>
                  <span>{isKhmer ? 'បទពិសោធន៍ដឹកនាំក្រុមពីចម្ងាយ' : 'Remote Team Lead Experience'}</span>
                </span>
              </div>
            </div>

            {/* Right Card: Avatar & Quick Action */}
            <div className="lg:col-span-5 text-center">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/80 dark:to-slate-850 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-md flex flex-col items-center">
                {/* Avatar with pulsing rings and verified photo */}
                <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse scale-110"></div>
                  <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 z-10 ring-2 ring-blue-500/40 bg-slate-900">
                    <img
                      src="/profile.png"
                      alt="PRO DIGITAL Profile"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://lh3.googleusercontent.com/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K';
                      }}
                    />
                  </div>
                  {/* Verified Online Beacon */}
                  <span
                    className="absolute bottom-1 right-1 z-20 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-[10px] text-white"
                    title="Active & Available"
                  >
                    <i className="fa-solid fa-check text-[10px]"></i>
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-1">
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100">
                    PRO DIGITAL
                  </h4>
                  <a
                    href="https://drive.google.com/file/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K/view?usp=drivesdk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors p-1"
                    title="View Original Profile on Google Drive"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                  </a>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-6 pb-4 border-b border-slate-200 dark:border-slate-700 w-full">
                  {isKhmer ? 'ស្ថាបត្យករវេបសាយ & ស្វ័យប្រវត្តិកម្ម' : 'Web & Automation Architect'}
                </p>

                <div className="w-full space-y-3">
                  <a
                    href={PERSONAL_INFO.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] hover:from-[#162d55] hover:to-[#1e3c72] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <i className="fa-brands fa-telegram text-sky-400 text-lg"></i>
                    <span>{isKhmer ? 'ជជែកតាម Telegram ផ្ទាល់' : 'Chat on Telegram'}</span>
                  </a>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{isKhmer ? 'ជាទូទៅឆ្លើយតបក្នុងរយៈពេលក្រោម ១ ម៉ោង' : 'Typically replies within 1 hour'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
