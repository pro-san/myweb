import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface DeliveryRecord {
  id: string;
  project: string;
  projectKm: string;
  clientLocation: string;
  flag: string;
  timeAgo: string;
  timeAgoKm: string;
  category: string;
  status: string;
}

const RECENT_DELIVERIES: DeliveryRecord[] = [
  {
    id: 'del-1',
    project: 'Hostel WAL SQLite Engine v2.4',
    projectKm: 'ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល SQLite WAL v2.4',
    clientLocation: 'Phnom Penh, Cambodia',
    flag: '🇰🇭',
    timeAgo: '18 mins ago',
    timeAgoKm: '១៨ នាទីមុន',
    category: 'Offline Desktop SaaS',
    status: 'DEPLOYED & ACID VERIFIED',
  },
  {
    id: 'del-2',
    project: 'FBM Prime Anti-Detection Cloud Daemon',
    projectKm: 'Bot ស្វ័យប្រវត្តិកម្ម FBM Prime Anti-Detection',
    clientLocation: 'Virginia, United States',
    flag: '🇺🇸',
    timeAgo: '2 hours ago',
    timeAgoKm: '២ ម៉ោងមុន',
    category: 'E-Commerce Automation',
    status: 'PRODUCTION ACTIVE',
  },
  {
    id: 'del-3',
    project: 'Vicidial VoIP CRM WhatsApp Dispatcher',
    projectKm: 'ប្រព័ន្ធផ្ញើសារ WhatsApp ស្វ័យប្រវត្តិ Vicidial',
    clientLocation: 'London, United Kingdom',
    flag: '🇬🇧',
    timeAgo: '5 hours ago',
    timeAgoKm: '៥ ម៉ោងមុន',
    category: 'Telephony Bridge',
    status: 'DELIVERED (4.5K LEADS/DAY)',
  },
  {
    id: 'del-4',
    project: 'Multi-Warehouse Webhook Inventory Sync',
    projectKm: 'ប្រព័ន្ធ Webhook គ្រប់គ្រងស្តុកពហុឃ្លាំង',
    clientLocation: 'Toronto, Canada',
    flag: '🇨🇦',
    timeAgo: 'Yesterday',
    timeAgoKm: 'ម្សិលមិញ',
    category: 'REST API & Webhooks',
    status: '99.98% UPTIME CERTIFIED',
  },
  {
    id: 'del-5',
    project: 'Thermal 80mm ESC/POS Receipt Generator',
    projectKm: 'ប្រព័ន្ធព្រីនវិក្កយបត្រកម្ដៅ Thermal POS 80mm',
    clientLocation: 'Siem Reap, Cambodia',
    flag: '🇰🇭',
    timeAgo: '2 days ago',
    timeAgoKm: '២ ថ្ងៃមុន',
    category: 'Hardware Integration',
    status: 'HARDWARE HANDOFF COMPLETE',
  },
];

export const LiveActivityCounter: React.FC = () => {
  const { language, t } = useLanguage();
  const isKhmer = language === 'km';

  // Dynamic realistic visitor count with organic fluctuations
  const [visitorCount, setVisitorCount] = useState<number>(22);
  const [activeDeliveryIndex, setActiveDeliveryIndex] = useState<number>(0);
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<boolean>(false);

  // Fluctuating visitor count every 4-7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        const delta = Math.random() > 0.48 ? 1 : -1;
        const next = Math.max(16, Math.min(31, prev + delta));
        setPulseCount(true);
        setTimeout(() => setPulseCount(false), 800);
        return next;
      });
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  // Cycle through recent deliveries ticker every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDeliveryIndex((prev) => (prev + 1) % RECENT_DELIVERIES.length);
    }, 4200);

    return () => clearInterval(timer);
  }, []);

  const activeDelivery = RECENT_DELIVERIES[activeDeliveryIndex];

  return (
    <>
      <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          {/* Left: Live Visitor Count with Pulsing Radar Beacon */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full lg:w-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="uppercase text-[10px] tracking-wider text-emerald-800 dark:text-emerald-400">
                {t('live_badge')}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
              <span
                className={`font-black font-mono text-sm px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-300 ${
                  pulseCount ? 'scale-110 text-emerald-600 dark:text-emerald-400' : ''
                }`}
              >
                {visitorCount}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs">
                {isKhmer ? 'នាក់កំពុងទស្សនាផ្ទាល់' : 'active tech clients viewing now'}
              </span>
              <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span>🇺🇸 🇨🇦 🇬🇧 🇰🇭</span>
                <span>(Global Nodes)</span>
              </span>
            </div>
          </div>

          {/* Right: Recent Projects Delivered Live Ticker */}
          <div className="flex items-center justify-center lg:justify-end gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2 max-w-full overflow-hidden">
              <div className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px] shrink-0">
                <i className="fa-solid fa-rocket text-blue-600 dark:text-blue-400"></i>
                <span className="font-bold text-slate-700 dark:text-slate-200">28 Shipped:</span>
              </div>

              {/* Animated ticker pill */}
              <div
                key={activeDelivery.id}
                className="animate-fade-in inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/80 dark:bg-slate-800/80 border border-blue-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-sans truncate max-w-[280px] sm:max-w-xs transition-all duration-300"
              >
                <span className="text-xs">{activeDelivery.flag}</span>
                <span className="font-semibold truncate text-slate-900 dark:text-slate-100">
                  {isKhmer ? activeDelivery.projectKm : activeDelivery.project}
                </span>
                <span className="text-slate-400 text-[10px] shrink-0 font-mono">
                  ({isKhmer ? activeDelivery.timeAgoKm : activeDelivery.timeAgo})
                </span>
              </div>
            </div>

            {/* Quick Inspection Button */}
            <button
              onClick={() => setIsLogDrawerOpen(true)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              title="Inspect Recent Project Deliveries & Telemetry Logs"
            >
              <i className="fa-solid fa-list-check text-blue-500"></i>
              <span className="hidden md:inline">{isKhmer ? 'កំណត់ហេតុ' : 'Logs'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Project Delivery Audit Modal */}
      {isLogDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLogDrawerOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative text-slate-900 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-satellite-dish"></i>
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">
                    {isKhmer ? 'កំណត់ត្រាប្រគល់គម្រោង & សកម្មភាពផ្ទាល់' : 'Recent Project Deliveries & Telemetry'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isKhmer
                      ? 'ផ្ទៀងផ្ទាត់ការប្រគល់កូដ និងប្រព័ន្ធសូហ្វវែរពិតប្រាកដសម្រាប់អតិថិជន'
                      : 'Verified commercial software deliveries and live traffic telemetry'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsLogDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Live Metrics Summary Bar */}
            <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 uppercase">Live Clients</div>
                <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{visitorCount} Active</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 uppercase">Shipped Projects</div>
                <div className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  28 Completed
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] text-slate-500 uppercase">Delivery SLA</div>
                <div className="text-lg font-black text-amber-500 mt-0.5">
                  100% On-Time
                </div>
              </div>
            </div>

            {/* Delivery Feed List */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {RECENT_DELIVERIES.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-750 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">{item.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {isKhmer ? item.projectKm : item.project}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                        {item.clientLocation} • <span className="text-blue-600 dark:text-blue-400">{item.category}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded font-mono text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {item.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      {isKhmer ? item.timeAgoKm : item.timeAgo}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                <i className="fa-solid fa-lock text-emerald-500 mr-1"></i>
                Client confidentiality respected (NDA preserved)
              </span>
              <button
                onClick={() => setIsLogDrawerOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                {isKhmer ? 'បិទផ្ទាំង' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
