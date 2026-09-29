import React from 'react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 border-t border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/60 services-bg-pattern relative transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 rounded-full px-4 py-1 mb-3">
            CLIENT SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Services I Provide
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Custom software engineering services tailored to automate business workflows, eliminate human calculation errors, and boost profitability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const isWide = index >= 3;
            return (
              <div
                key={service.id}
                className={`group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden ${
                  isWide ? 'lg:col-span-1 md:col-span-1' : ''
                }`}
              >
                {/* Background hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${service.bgColorClass} ${service.colorClass} flex items-center justify-center text-2xl mb-5 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-sm`}
                  >
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-white transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 group-hover:text-slate-200 text-sm leading-relaxed mb-5 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-200 mb-6 transition-colors duration-300 border-t border-slate-100 dark:border-slate-800 group-hover:border-white/20 pt-4">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <i className="fa-solid fa-check text-emerald-500 group-hover:text-emerald-300 mt-0.5 text-xs"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="relative z-10 pt-2">
                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service.title);
                      } else {
                        const contactElem = document.getElementById('contact');
                        contactElem?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 group-hover:border-white/30 text-slate-700 dark:text-slate-300 group-hover:text-white group-hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span>Request This Service</span>
                    <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
