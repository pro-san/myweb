import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-amber-700 bg-amber-100/80 border border-amber-300 rounded-full px-4 py-1 mb-3">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Client Reviews & Real-World Impact
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            Direct feedback from commercial business owners and agency directors operating my custom software solutions daily.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4 text-sm">
                  {[...Array(test.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-2">5.0 / 5.0</span>
                </div>

                {/* Quote */}
                <p className="text-slate-700 italic text-sm sm:text-base leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div
                  className={`w-11 h-11 rounded-full text-white font-extrabold text-sm flex items-center justify-center shadow-md ${
                    test.id === 'hk' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}
                >
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {test.author}
                  </h4>
                  <p className="text-slate-500 text-xs font-medium">
                    {test.project} • <span className="text-emerald-600 font-semibold">Verified Client</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
