import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);

  const stepDetails = [
    {
      step: '1',
      title: 'Discovery & Requirements',
      duration: '1-2 Days',
      deliverables: ['System Requirements Spec (SRS)', 'Bottleneck Analysis', 'Tech Stack Evaluation'],
      tools: ['Figma', 'Miro', 'Postman', 'Notion'],
      codePreview: `// Phase 1 Discovery Contract\nconst projectBrief = {\n  client: "Enterprise Commercial",\n  targetGoal: "Eliminate manual data entries & 0% crash tolerance",\n  concurrencyTarget: "10,000 requests/day",\n  offlineRequired: true\n};`,
      description: 'We analyze your current manual bottlenecks, identify performance friction points, and document precise functional specifications before writing a single line of code.'
    },
    {
      step: '2',
      title: 'Planning & Schema Blueprinting',
      duration: '2-3 Days',
      deliverables: ['SQLite WAL / PostgreSQL Schema', 'REST API Architecture', 'Anti-Detection Pipeline Design'],
      tools: ['DrawSQL', 'Lucidchart', 'Docker', 'Swagger'],
      codePreview: `-- Phase 2 Database Schema Architecture\nCREATE TABLE tenants (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  room_no TEXT NOT NULL,\n  monthly_rate REAL NOT NULL\n);\nPRAGMA journal_mode = WAL;`,
      description: 'Designing rock-solid database schemas, WAL mode concurrency models, microservice endpoints, and proxy pool topologies to prevent deadlocks and data corruption.'
    },
    {
      step: '3',
      title: 'Core Development & Engineering',
      duration: '5-10 Days',
      deliverables: ['Clean Modular Codebase', 'Backend API Endpoints', 'Pixel-Perfect Responsive UI'],
      tools: ['React 19', 'Python 3.11', 'Flask/Express', 'Tailwind CSS'],
      codePreview: `# Phase 3 Backend Logic Implementation\ndef process_transaction(tenant_id, amount):\n    with db.transaction():\n        ledger.record(tenant_id, amount)\n        receipt.generate(tenant_id)`,
      description: 'Writing maintainable, clean code. Implementing multi-threaded scrapers with fingerprint cloaking and sub-second local database query speeds.'
    },
    {
      step: '4',
      title: 'Testing & Zero-Crash QA',
      duration: '2-4 Days',
      deliverables: ['Automated End-to-End Tests', 'Load & Concurrency Profiling', 'Security Penetration Checks'],
      tools: ['Playwright', 'Selenium', 'Postman Collection Runner', 'Locust'],
      codePreview: `// Phase 4 Automated Load Simulation\nfor (let i = 0; i < 500; i++) {\n  simulateConcurrentCheckout({\n    threadId: i,\n    expectResponseMs: "< 25ms",\n    assertZeroLocks: true\n  });\n}`,
      description: 'Subjecting the software to heavy load tests, simulated network latency, edge-case validation, and anti-ban bot evasion testing to guarantee zero crashes.'
    },
    {
      step: '5',
      title: 'Live Production Delivery',
      duration: '1-2 Days',
      deliverables: ['Production Deployment', 'Data Migration & Seeding', 'Admin Video Walkthrough'],
      tools: ['VPS / Linux', 'Vercel', 'AWS / Cloudflare', 'SSL/TLS'],
      codePreview: `# Phase 5 Deployment Automation\nsudo systemctl daemon-reload\nsudo systemctl enable prodigital-app\nsudo systemctl restart prodigital-app\n# Status: Active (Running) 100% Uptime`,
      description: 'Deploying the system onto your production servers or local desktops, configuring auto-start daemons, and providing your team with complete operational onboarding.'
    },
    {
      step: '6',
      title: 'Ongoing Support & Optimization',
      duration: 'Ongoing',
      deliverables: ['24/7 Monitoring Alerts', 'Feature Additions', 'Lifetime Bug-Free Warranty'],
      tools: ['Sentry', 'LogTail', 'WhatsApp Priority Desk', 'GitHub CI/CD'],
      codePreview: `// Phase 6 Active Healthcheck Cron\ncron.schedule("*/5 * * * *", async () => {\n  const health = await checkSystemHealth();\n  if (!health.ok) alertEngineer("PRO DIGITAL On-Call");\n});`,
      description: 'Continuous proactive monitoring, periodic dependency updates, database index optimization, and dedicated direct engineer support.'
    }
  ];

  const currentDetail = stepDetails[selectedStepIdx];

  return (
    <section id="process" className="py-20 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,60,114,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-100/80 border border-blue-300 rounded-full px-4 py-1 mb-3">
            WORK PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How I Work — 6-Step Process
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-700 to-emerald-500 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            A structured, transparent development methodology. Click on any step to inspect deliverables, duration, and architectural artifacts.
          </p>
        </div>

        {/* Process Flow Cards (Clickable Steps) */}
        <div className="relative mt-8 mb-12">
          {/* Animated Connecting Line (desktop only) */}
          <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-1 bg-gradient-to-r from-slate-200 via-emerald-400 to-blue-700 animate-gradient-flow rounded-full opacity-60 z-0"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {PROCESS_STEPS.map((item, idx) => {
              const isSelected = selectedStepIdx === idx;
              const isLast = idx === PROCESS_STEPS.length - 1;

              return (
                <button
                  key={item.step}
                  onClick={() => setSelectedStepIdx(idx)}
                  className={`group rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-600 shadow-xl ring-2 ring-blue-500/20 -translate-y-2'
                      : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Step Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-base mx-auto mb-3 border-2 shadow-sm transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-200 scale-110'
                          : 'bg-slate-100 text-slate-700 border-white group-hover:bg-blue-600 group-hover:text-white'
                      }`}
                    >
                      {isLast ? <i className="fa-solid fa-infinity text-sm"></i> : item.step}
                    </div>

                    {/* Step Title */}
                    <h3
                      className={`font-extrabold text-sm mb-1.5 transition-colors ${
                        isSelected ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-[11px] leading-relaxed hidden sm:block">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-center">
                    <span
                      className={`text-[10px] uppercase font-bold ${
                        isSelected ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    >
                      {isSelected ? 'Active Phase' : `Phase 0${idx + 1}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Deep-Dive Inspector Panel */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30">
                  Phase 0{selectedStepIdx + 1}
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  Est. Duration: {currentDetail.duration}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {currentDetail.title}
              </h3>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={selectedStepIdx === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-all disabled:opacity-30 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left mr-1"></i> Prev Phase
              </button>
              <button
                onClick={() => setSelectedStepIdx((prev) => Math.min(stepDetails.length - 1, prev + 1))}
                disabled={selectedStepIdx === stepDetails.length - 1}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold transition-all disabled:opacity-30 cursor-pointer"
              >
                Next Phase <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Left Column: Description & Deliverables */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                {currentDetail.description}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Key Deliverables
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {currentDetail.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Standard Tooling
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentDetail.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Code / Architecture Snippet */}
            <div className="lg:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800 mb-2">
                <span>Phase Artifact Sample</span>
                <span className="text-emerald-400 text-[10px]">Validated Architecture</span>
              </div>
              <pre className="text-blue-300 leading-relaxed overflow-x-auto">
                {currentDetail.codePreview}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
