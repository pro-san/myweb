import React from 'react';

export const TestimonialCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col justify-between animate-shimmer">
      <div>
        {/* 5-star rating */}
        <div className="flex items-center gap-1.5 mb-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          ))}
          <div className="h-4 w-14 rounded bg-slate-200 dark:bg-slate-800 animate-pulse ml-2"></div>
        </div>

        {/* Quote */}
        <div className="space-y-2.5 mb-8">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-3 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
