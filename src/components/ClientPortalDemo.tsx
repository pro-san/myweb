import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ClientPortalDemo: React.FC = () => {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  const [activeProjectKey, setActiveProjectKey] = useState<'hostel' | 'bot' | 'telephony'>('hostel');
  const [activeTab, setActiveTab] = useState<'milestones' | 'tests' | 'commits' | 'ip'>('milestones');

  const demoProjects = {
    hostel: {
      title: isKhmer ? 'ប្រព័ន្ធគ្រប់គ្រងអន្តេវាសិកដ្ឋាន (Hostel MS)' : 'Hostel Management System (Offline Desktop)',
      code: 'PRIME-HSTL-09',
      client: 'KPK Residency Group',
      progress: 88,
      status: isKhmer ? 'ដំណាក់កាល QA & សាកល្បងម៉ាស៊ីនបោះពុម្ព' : 'Phase 4: QA Testing & Thermal Print Validation',
      stagingUrl: 'https://preview-hostel.fbmprime.internal/demo',
      lastDeployed: '18 minutes ago',
      tests: { passed: 148, failed: 0, pending: 0, coverage: '99.4%' },
      commits: [
        { hash: 'a89c2f1', msg: 'fix: optimize SQLite WAL checkpoint frequency during multi-tenant bulk rent calculation', time: '18m ago' },
        { hash: 'e410bc9', msg: 'feat: add ESC/POS thermal receipt 58mm & 80mm native hardware driver bypass', time: '2h ago' },
        { hash: 'b76a012', msg: 'test: simulate 500 concurrent receipt generations without database lock', time: '5h ago' },
      ],
      milestones: [
        { name: '1. SRS Requirements & Schema Blueprint', status: 'completed', date: 'Sept 10' },
        { name: '2. Core Backend Logic & WAL Mode Setup', status: 'completed', date: 'Sept 16' },
        { name: '3. Responsive UI & PDF Generator Engine', status: 'completed', date: 'Sept 22' },
        { name: '4. Zero-Crash Stress QA & Hardware Test', status: 'active', date: 'In Progress (Target: Today)' },
        { name: '5. Production Deployment & Staff Onboarding', status: 'upcoming', date: 'Next Up' },
        { name: '6. 30-Day Free Warranty & SLA Handover', status: 'upcoming', date: 'Final Step' },
      ]
    },
    bot: {
      title: isKhmer ? 'FBM Prime Bot ស្វ័យប្រវត្តិកម្ម Marketplace' : 'FBM Prime Automation Engine (Multi-Threaded)',
      code: 'PRIME-BOT-88',
      client: 'Apex E-Com Ventures',
      progress: 94,
      status: isKhmer ? 'ដំណាក់កាលត្រួតពិនិត្យ Anti-Detect Fingerprint' : 'Phase 5: Final Proxy Pool & Cloaking Verification',
      stagingUrl: 'https://bot-staging.fbmprime.internal/telemetry',
      lastDeployed: '42 minutes ago',
      tests: { passed: 212, failed: 0, pending: 0, coverage: '98.8%' },
      commits: [
        { hash: 'f218da3', msg: 'security: upgrade WebGL vendor string rotation for Chrome 128 parity', time: '42m ago' },
        { hash: 'c908ee1', msg: 'perf: dynamic thread throttling on proxy HTTP 429 backoff rate', time: '3h ago' },
        { hash: '91d5cb0', msg: 'feat: add Telegram bot webhook notifications on batch job completion', time: '1d ago' },
      ],
      milestones: [
        { name: '1. Architecture Blueprint & Proxy Topology', status: 'completed', date: 'Aug 28' },
        { name: '2. Canvas & AudioContext Fingerprint Spoofing', status: 'completed', date: 'Sept 04' },
        { name: '3. Automated Form Multi-Thread Dispatcher', status: 'completed', date: 'Sept 12' },
        { name: '4. Captcha Resolver Hooks & Retry Backoff', status: 'completed', date: 'Sept 19' },
        { name: '5. Live Staging Beta Testing with 1,000 Tasks', status: 'active', date: 'In Progress' },
        { name: '6. Full Source Code & Private Git Repository Transfer', status: 'upcoming', date: 'Pending Final Gate' },
      ]
    },
    telephony: {
      title: isKhmer ? 'ប្រព័ន្ធតភ្ជាប់ ViciDial & Webhook CRM' : 'ViciDial Telephony Real-Time Webhook Bridge',
      code: 'PRIME-VICI-14',
      client: 'Apex Global BPO',
      progress: 100,
      status: isKhmer ? 'បានបញ្ចប់ & ប្រគល់កូដ ១០០%' : 'Phase 6: Delivered & Active in Production',
      stagingUrl: 'https://bridge.fbmprime.internal/healthcheck',
      lastDeployed: 'Production Stable',
      tests: { passed: 96, failed: 0, pending: 0, coverage: '100%' },
      commits: [
        { hash: '7c4091a', msg: 'release: v1.0.0 production deployment tagged and audited', time: '3d ago' },
        { hash: '4399af0', msg: 'chore: deliver Docker compose production stack and environment docs', time: '4d ago' },
      ],
      milestones: [
        { name: '1. Webhook Payload Scoping & Security Tokens', status: 'completed', date: 'Aug 14' },
        { name: '2. Low-Latency Node.js Middleware Handler', status: 'completed', date: 'Aug 18' },
        { name: '3. Real-Time Disposition Sync & Deduplication', status: 'completed', date: 'Aug 22' },
        { name: '4. Concurrency Load Test (50 Calls/sec)', status: 'completed', date: 'Aug 25' },
        { name: '5. Production Linux VPS Daemon Deployment', status: 'completed', date: 'Aug 28' },
        { name: '6. Final IP Assignment & GitHub Private Repo Handoff', status: 'completed', date: 'Sept 01' },
      ]
    }
  };

  const project = demoProjects[activeProjectKey];

  return (
    <section id="client-portal" className="py-20 bg-white dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <i className="fa-solid fa-satellite-dish text-blue-600 dark:text-blue-400"></i>
            <span>{isKhmer ? 'តម្លាភាព ១០០% សម្រាប់អតិថិជន' : 'CLIENT TRANSPARENCY DEMO'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            {isKhmer
              ? 'ប្រព័ន្ធតាមដានវឌ្ឍនភាពគម្រោង និងការធានាគុណភាពជាក់ស្តែង'
              : 'Live Client Milestone Tracker & QA Verification Portal'}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {isKhmer
              ? 'អតិថិជនរបស់ខ្ញុំមិនដែលព្រួយបារម្ភអំពីភាពមិនច្បាស់លាស់ឡើយ។ អ្នកអាចតាមដានកូដ តំណភ្ជាប់ Preview ផ្ទាល់ និងលទ្ធផលតេស្តជាប្រចាំ។'
              : 'Experience how you monitor your project in real-time: inspect milestone checkpoints, continuous staging preview deployments, automated QA test suites, and verified IP handover.'}
          </p>
        </div>

        {/* Project Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { key: 'hostel', label: 'Hostel Management App', badge: '88% Completed' },
            { key: 'bot', label: 'FBM Prime Automation Bot', badge: '94% Completed' },
            { key: 'telephony', label: 'ViciDial CRM Bridge', badge: '100% Delivered' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveProjectKey(item.key as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                activeProjectKey === item.key
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{item.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeProjectKey === item.key ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                {item.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Portal Dashboard Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors duration-200">
          {/* Top Bar: Project Meta & Status */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border-b border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                    {project.code}
                  </span>
                  <span className="text-xs text-slate-400">
                    Client: <strong className="text-slate-200">{project.client}</strong>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {project.title}
                </h3>
              </div>

              {/* Staging Link */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-[11px] text-slate-400 font-mono">Last Deployed</div>
                  <div className="text-xs text-emerald-400 font-bold">{project.lastDeployed}</div>
                </div>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  <span>{isKhmer ? 'ចូលមើល Staging' : 'Staging Preview'}</span>
                </a>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{project.status}</span>
                </span>
                <span className="text-emerald-400 font-mono text-sm">{project.progress}% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 gap-6 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm font-bold overflow-x-auto">
            {[
              { id: 'milestones', label: isKhmer ? 'ដំណាក់កាលការងារ (Milestones)' : 'Sprint Milestones', icon: 'fa-list-check' },
              { id: 'tests', label: isKhmer ? 'លទ្ធផលតេស្ត QA (Tests)' : 'Automated QA Tests', icon: 'fa-shield-halved' },
              { id: 'commits', label: isKhmer ? 'ប្រវត្តិកូដ Git (Commits)' : 'Recent Git Commits', icon: 'fa-code-branch' },
              { id: 'ip', label: isKhmer ? 'កម្មសិទ្ធិបញ្ញា & កិច្ចសន្យា' : 'IP & Contract Agreement', icon: 'fa-file-signature' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 border-b-2 whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-6 sm:p-8 text-slate-700 dark:text-slate-300">
            {/* Tab 1: Milestones */}
            {activeTab === 'milestones' && (
              <div className="space-y-3">
                {project.milestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      ms.status === 'completed'
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                        : ms.status === 'active'
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 ring-2 ring-blue-500/15'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          ms.status === 'completed'
                            ? 'bg-emerald-500 text-white'
                            : ms.status === 'active'
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {ms.status === 'completed' ? <i className="fa-solid fa-check"></i> : idx + 1}
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${ms.status === 'active' ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-slate-100'}`}>
                          {ms.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {ms.date}
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <span
                        className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                          ms.status === 'completed'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            : ms.status === 'active'
                            ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {ms.status === 'completed' ? 'Verified & Approved' : ms.status === 'active' ? 'Active Work sprint' : 'Upcoming Phase'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Automated Tests */}
            {activeTab === 'tests' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 font-bold uppercase">Tests Passed</div>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{project.tests.passed}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Failures</div>
                    <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">{project.tests.failed}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Code Coverage</div>
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">{project.tests.coverage}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Crash Probability</div>
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">0.0%</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1.5 border border-slate-800">
                  <div className="text-emerald-400 font-bold">&gt; jest --runInBand --coverage --detectOpenHandles</div>
                  <div className="text-slate-400">PASS src/services/transaction_ledger.spec.ts (84 tests, 412ms)</div>
                  <div className="text-slate-400">PASS src/drivers/receipt_thermal.spec.ts (32 tests, 189ms)</div>
                  <div className="text-slate-400">PASS src/security/fingerprint_evasion.spec.ts (32 tests, 510ms)</div>
                  <div className="text-emerald-300 font-bold pt-1">
                    ✓ All {project.tests.passed} test suites passed cleanly with zero memory leaks.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Recent Commits */}
            {activeTab === 'commits' && (
              <div className="space-y-3 font-mono text-xs">
                {project.commits.map((c, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">
                        {c.hash}
                      </span>
                      <span className="text-slate-800 dark:text-slate-200 font-sans font-medium text-xs sm:text-sm">
                        {c.msg}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0">{c.time}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: IP Agreement */}
            {activeTab === 'ip' && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold">
                  <i className="fa-solid fa-circle-check text-xl"></i>
                  <span>100% Intellectual Property Assignment Contract Included</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Upon completion of your project milestone gates, full legal ownership of the source code, private GitHub repository access, database schemas, and commercial deployment credentials are transferred to you in writing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Private GitHub Repo</div>
                    <div className="text-xs text-slate-500">Ownership Invited</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Docker &amp; CI/CD Stack</div>
                    <div className="text-xs text-slate-500">Self-hostable</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-slate-100">Zero Vendor Lock-in</div>
                    <div className="text-xs text-slate-500">No recurring fee</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Footer */}
          <div className="p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 dark:text-slate-400">
              Want this exact level of milestone transparency for your software project?
            </span>
            <a
              href={PERSONAL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold transition-all shadow-sm"
            >
              <i className="fa-brands fa-telegram"></i>
              <span>Book Project with PRO DIGITAL</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
