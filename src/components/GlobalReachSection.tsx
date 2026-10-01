import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GLOBAL_COUNTRIES, GlobalCountryData } from '../data/globalReachData';
import { GlobalReachMap } from './GlobalReachMap';

interface GlobalReachSectionProps {
  onContactClick?: (regionName: string) => void;
}

export const GlobalReachSection: React.FC<GlobalReachSectionProps> = ({ onContactClick }) => {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  // Default to Cambodia (HQ) or United States
  const [selectedCountry, setSelectedCountry] = useState<GlobalCountryData>(
    GLOBAL_COUNTRIES.find((c) => c.isHQ) || GLOBAL_COUNTRIES[0]
  );

  const handleSelectCountry = (country: GlobalCountryData) => {
    setSelectedCountry(country);
  };

  const handleContactForRegion = () => {
    if (onContactClick) {
      onContactClick(`${selectedCountry.name} (${selectedCountry.id})`);
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="global-reach"
      className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-b border-slate-800 transition-colors duration-200"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 dark-grid-pattern opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1">
              {t('global_badge')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/80 rounded-full px-3 py-1 shadow-2xs">
              <i className="fa-regular fa-clock text-blue-400"></i>
              <span>{isKhmer ? 'រយៈពេលអាន ~២ នាទី' : 'Estimated read: 2 min'}</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {t('global_title')}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('global_subtitle')}
          </p>

          {/* Quick Select Country Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {GLOBAL_COUNTRIES.map((country) => {
              const isSelected = selectedCountry.id === country.id;
              return (
                <button
                  key={country.id}
                  onClick={() => handleSelectCountry(country)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-blue-500/20 shadow-lg scale-105 border border-blue-400'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="text-base">{country.flag}</span>
                  <span>{isKhmer ? country.nameKm : country.name}</span>
                  {country.isHQ && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      HQ
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive D3 World Map Visualization */}
        <div className="mb-12">
          <GlobalReachMap
            selectedCountryId={selectedCountry.id}
            onSelectCountry={handleSelectCountry}
            isKhmer={isKhmer}
          />
        </div>

        {/* Selected Country Deep-Dive Deployment Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle colored accent line on top */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
            style={{ backgroundColor: selectedCountry.color }}
          ></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Country overview and key metrics */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-slate-700/60"
                  style={{ backgroundColor: `${selectedCountry.color}15` }}
                >
                  <span>{selectedCountry.flag}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {isKhmer ? selectedCountry.nameKm : selectedCountry.name}
                    </h3>
                    {selectedCountry.isHQ && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-extrabold border border-emerald-500/30">
                        PRIMARY HQ
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
                    <i className="fa-solid fa-location-dot text-blue-400 text-xs"></i>
                    <span>{isKhmer ? selectedCountry.cityNodeKm : selectedCountry.cityNode}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isKhmer ? selectedCountry.summaryKm : selectedCountry.summary}
              </div>

              {/* Technical Telemetry Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {isKhmer ? selectedCountry.metrics.primaryLabelKm : selectedCountry.metrics.primaryLabel}
                  </div>
                  <div
                    className="text-base sm:text-lg font-black mt-0.5"
                    style={{ color: selectedCountry.color }}
                  >
                    {selectedCountry.metrics.primaryNumber}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {isKhmer ? 'ម៉ោងធ្វើការ (Zone)' : 'Timezone'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
                    {selectedCountry.metrics.timezone.split(' ')[0]}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    {isKhmer ? 'ល្បឿនតភ្ជាប់' : 'API Latency'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">
                    {selectedCountry.metrics.latency}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Active Production Projects list & CTA */}
            <div className="lg:col-span-6 bg-slate-950/60 p-6 sm:p-7 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <i className="fa-solid fa-server text-blue-400"></i>
                    <span>{isKhmer ? 'ប្រព័ន្ធសូហ្វវែរដែលបានដាក់ឱ្យដំណើរការ' : 'Active Production Systems & Daemons'}</span>
                  </span>
                  <span
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor: `${selectedCountry.color}20`,
                      color: selectedCountry.color,
                    }}
                  >
                    {isKhmer ? selectedCountry.badgeKm : selectedCountry.badge}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {(isKhmer ? selectedCountry.projectsKm : selectedCountry.projects).map((proj, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0"
                        style={{
                          backgroundColor: `${selectedCountry.color}25`,
                          color: selectedCountry.color,
                        }}
                      >
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <span className="leading-snug">{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-slate-400 text-xs font-mono">
                  <i className="fa-solid fa-shield-halved text-emerald-400 mr-1.5"></i>
                  <span>{isKhmer ? 'ការធានាសុវត្ថិភាពកូដ & IP Delivery' : '100% Remote IP & Code Delivery'}</span>
                </div>

                <button
                  onClick={handleContactForRegion}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  style={{
                    backgroundColor: selectedCountry.color,
                  }}
                >
                  <span>
                    {isKhmer
                      ? `ពិភាក្សាគម្រោងសម្រាប់ ${selectedCountry.nameKm}`
                      : `Discuss Project for ${selectedCountry.name}`}
                  </span>
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Impact Summary 4-Column Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">4 Regions</div>
            <div className="text-xs text-slate-400 mt-1">
              {isKhmer ? 'ប្រទេសដែលកំពុងប្រើប្រាស់' : 'Production Deployment Zones'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">24/7 Sync</div>
            <div className="text-xs text-slate-400 mt-1">
              {isKhmer ? 'ម៉ោងធ្វើការបត់បែនតាមតំបន់' : 'Flexible Timezone Overlap'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">&lt; 180ms</div>
            <div className="text-xs text-slate-400 mt-1">
              {isKhmer ? 'ល្បឿនឆ្លើយតប API សកល' : 'Global API Routing Latency'}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-purple-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">
              {isKhmer ? 'ការប្រគល់កម្មសិទ្ធិពេញលេញ' : 'Verified IP & Code Ownership'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
