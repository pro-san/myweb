import React from 'react';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between animate-shimmer">
      <div>
        {/* Category Header */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            {/* Category Icon */}
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            {/* Tag Badge */}
            <div className="h-6 w-36 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          </div>
          {/* Deep dive text */}
          <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>

        {/* Project Title */}
        <div className="h-8 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse mb-3"></div>

        {/* Description */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-11/12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>

        {/* High-fidelity Mockup Frame Skeleton */}
        <div className="h-44 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/80 p-4 mb-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="h-3 w-28 rounded bg-slate-300 dark:bg-slate-700 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700/70 animate-pulse"></div>
            <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700/70 animate-pulse"></div>
            <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700/70 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          </div>
        </div>

        {/* Highlights List */}
        <div className="space-y-2.5 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse mt-0.5 shrink-0"></div>
              <div className="h-3.5 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-6 w-20 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-6 w-24 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-6 w-16 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-6 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="h-11 flex-1 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          <div className="h-11 flex-1 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
