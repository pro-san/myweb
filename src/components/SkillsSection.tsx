import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section id="skills" className="py-20 bg-white border-t border-b border-slate-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-100/80 border border-emerald-300 rounded-full px-4 py-1 mb-3">
            TECHNICAL PROFICIENCY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Technical Skills & Tech Stack
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            Languages, frameworks, offline database engines, and automation tools I leverage to build production-grade applications.
          </p>

          {/* Quick Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search technologies (e.g. SQLite, Python, React)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isWide = idx >= 3;
            const filteredSkills = cat.skills.filter((s) =>
              s.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredSkills.length === 0) return null;

            return (
              <div
                key={cat.title}
                className={`bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isWide ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                    <span className={`text-xl ${cat.color}`}>
                      <i className={`fa-solid ${cat.icon}`}></i>
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50/70 hover:bg-blue-100/70 text-blue-900 border border-blue-200/60 transition-transform duration-200 hover:scale-105 cursor-default shadow-2xs"
                      >
                        <i className={`${skill.icon} ${skill.color} text-sm`}></i>
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-600 flex items-center justify-between">
                  <span>{filteredSkills.length} Technologies</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-xs"></i> Production Ready
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
