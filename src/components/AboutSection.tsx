import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 my-6 relative overflow-hidden bg-slate-50/50">
      {/* Decorative Blur Blobs */}
      <div className="absolute w-96 h-96 -top-20 -left-20 bg-blue-400/10 rounded-full blur-3xl pointer-events-none animate-float-blob"></div>
      <div className="absolute w-80 h-80 -bottom-16 -right-16 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-float-blob"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-100/80 border border-blue-300 rounded-full px-4 py-1 mb-3">
            MY BACKGROUND
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About Me & Expertise
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-700 to-emerald-500 rounded mx-auto mb-4"></div>
        </div>

        {/* Card Box */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6 bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#25D366] bg-clip-text text-transparent">
                Engineering Solutions That Scale & Convert
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                Based in Pakistan, I am a results-driven{' '}
                <strong className="text-slate-900 font-bold">
                  Full-Stack Web Developer
                </strong>{' '}
                and{' '}
                <strong className="text-slate-900 font-bold">
                  Automation Systems Architect
                </strong>
                . Since 2023, I have been building high-performance web portals, standalone offline databases, and automated background bots for businesses across the US, Canada, and globally.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                I bring unique cross-functional experience: having managed remote sales teams, scaled international marketplace operations, and driven digital reach to over{' '}
                <strong className="text-blue-700 font-bold">10 Million organic views</strong>
                . This deep business perspective ensures that every application I engineer is optimized for real revenue, lightning speed, and flawless user experience.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs flex items-center gap-2">
                  <i className="fa-solid fa-location-dot text-rose-500"></i>
                  <span>Pakistan Based</span>
                </span>
                <span className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs flex items-center gap-2">
                  <i className="fa-solid fa-globe text-blue-600"></i>
                  <span>Global Clients (US, CA, UK)</span>
                </span>
                <span className="px-3.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs flex items-center gap-2">
                  <i className="fa-solid fa-users-gear text-emerald-600"></i>
                  <span>Remote Team Lead Experience</span>
                </span>
              </div>
            </div>

            {/* Right Card: Avatar & Quick Action */}
            <div className="lg:col-span-5 text-center">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200/80 shadow-md flex flex-col items-center">
                {/* Avatar with pulsing rings */}
                <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse scale-110"></div>
                  <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-slate-100 z-10 text-blue-600 text-4xl">
                    <i className="fa-solid fa-user-astronaut"></i>
                  </div>
                </div>

                <h4 className="text-xl font-black text-slate-900 mb-1">
                  PRO DIGITAL
                </h4>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-6 pb-4 border-b border-slate-200 w-full">
                  Web & Automation Architect
                </p>

                <div className="w-full space-y-3">
                  <a
                    href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
                      'Hi PRO DIGITAL! I read your About profile and would like to discuss a project.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] hover:from-[#162d55] hover:to-[#1e3c72] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <i className="fa-brands fa-whatsapp text-emerald-400 text-lg"></i>
                    <span>Start a Project</span>
                  </a>

                  <div className="text-[11px] text-slate-500 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Typically replies within 1 hour</span>
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
