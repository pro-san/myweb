import React, { useState, useMemo } from 'react';
import { FAQ_ITEMS, PERSONAL_INFO } from '../data/portfolioData';

type FaqCategory = 'all' | 'process' | 'pricing' | 'timeline';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['process-workflow', 'pricing-structure']);

  const categories: { key: FaqCategory; label: string; icon: string; count: number }[] = [
    { key: 'all', label: 'All FAQs', icon: 'fa-layer-group', count: FAQ_ITEMS.length },
    {
      key: 'process',
      label: 'Development Process',
      icon: 'fa-diagram-project',
      count: FAQ_ITEMS.filter((item) => item.category === 'process').length,
    },
    {
      key: 'pricing',
      label: 'Pricing & Billing',
      icon: 'fa-money-bill-wave',
      count: FAQ_ITEMS.filter((item) => item.category === 'pricing').length,
    },
    {
      key: 'timeline',
      label: 'Timelines & Sprints',
      icon: 'fa-clock-rotate-left',
      count: FAQ_ITEMS.filter((item) => item.category === 'timeline').length,
    },
  ];

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.highlights?.some((h) => h.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenIds(filteredItems.map((item) => item.id));
  };

  const handleCollapseAll = () => {
    setOpenIds([]);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'process':
        return { text: 'Process', color: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60' };
      case 'pricing':
        return { text: 'Pricing & Billing', color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60' };
      case 'timeline':
        return { text: 'Timelines', color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60' };
      default:
        return { text: 'FAQ', color: 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' };
    }
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-100/50 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-100/40 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <i className="fa-solid fa-circle-question text-blue-600 dark:text-blue-400"></i>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Transparent Answers on <span className="text-blue-600 dark:text-blue-400">Process, Pricing &amp; Timelines</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything you need to know before initiating a software build. No ambiguous billable hours, no proprietary vendor lock-in.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto p-1.5 bg-slate-100/90 dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <i className={`fa-solid ${cat.icon} text-xs ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}></i>
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold' : 'bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Expand / Collapse All) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 self-end md:self-auto">
              <button
                onClick={handleExpandAll}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition-colors shadow-2xs cursor-pointer"
              >
                <i className="fa-solid fa-angles-down mr-1.5 text-slate-400"></i> Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition-colors shadow-2xs cursor-pointer"
              >
                <i className="fa-solid fa-angles-up mr-1.5 text-slate-400"></i> Collapse All
              </button>
            </div>
          </div>

          {/* Realtime Search Input */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g., milestone, ownership, rush, warranty, stack)..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Clear search"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xl mb-3">
                <i className="fa-solid fa-circle-info"></i>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">No matching questions found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                No questions matched &quot;{searchQuery}&quot;. Clear your search or contact PRO DIGITAL directly on Telegram for immediate answers.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openIds.includes(item.id);
              const badge = getCategoryBadge(item.category);

              return (
                <div
                  key={item.id}
                  className={`group rounded-2xl border transition-all duration-200 overflow-hidden bg-white dark:bg-slate-900 ${
                    isOpen
                      ? 'border-blue-400/80 dark:border-blue-500/80 shadow-md ring-1 ring-blue-500/10 dark:ring-blue-500/20'
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                  }`}
                >
                  {/* Accordion Header / Question */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:bg-slate-50 dark:focus-visible:bg-slate-800"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="space-y-2 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      </div>
                      <h3
                        className={`text-base sm:text-lg font-bold transition-colors ${
                          isOpen ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-blue-600 text-white rotate-180 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-300'
                      }`}
                    >
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </div>
                  </button>

                  {/* Accordion Content / Answer */}
                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 dark:text-slate-300 text-sm sm:text-base border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50"
                    >
                      <p className="leading-relaxed text-slate-700 dark:text-slate-300">{item.answer}</p>

                      {/* Key Highlight Bullets */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-slate-800">
                          <div className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                            Key Takeaways
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {item.highlights.map((highlight, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs"
                              >
                                <i className="fa-solid fa-circle-check text-emerald-500 text-xs shrink-0"></i>
                                <span className="leading-tight">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Callout: Unanswered Question Box */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a1e3f] to-[#1e3c72] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <i className="fa-solid fa-headset"></i> Have a Custom or Unlisted Requirement?
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Get Direct Answers From PRO DIGITAL
              </h3>
              <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
                Every enterprise system and scraping bot has unique boundary requirements. Send your specification on Telegram for an immediate feasibility review and quote estimate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href={PERSONAL_INFO.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                <i className="fa-brands fa-telegram text-lg"></i>
                <span>Ask on Telegram</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all duration-200"
              >
                <i className="fa-solid fa-envelope"></i>
                <span>Send Brief</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
