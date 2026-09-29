import React from 'react';
import { STATS } from '../data/portfolioData';

export const StatsBanner: React.FC = () => {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 z-20">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-md transition-colors duration-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          {STATS.map((stat, idx) => (
            <div key={idx} className={`${idx > 0 ? 'pt-4 md:pt-0' : ''} px-2`}>
              <div className="flex items-center justify-center mb-2">
                <span className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-lg dark:bg-opacity-20`}>
                  <i className={`fa-solid ${stat.icon}`}></i>
                </span>
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${stat.color} tracking-tight`}>
                {stat.value}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-semibold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
