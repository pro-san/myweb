import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'simulation'>('overview');
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    'Initializing worker thread pool (Threads: 8)...',
    'Generating randomized browser fingerprint profile (Chrome 128 / Canvas / AudioContext)...',
    'Binding rotating residential proxy (Latency: 42ms, Node: US-East)...',
    'Executing task payload: Automated session persistence confirmed [HTTP 200 OK]',
    'Status: 100% Zero-crash rate sustained.'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!project) return null;

  const runSimulationStep = () => {
    setIsSimulating(true);
    const steps = [
      `[Task Dispatcher] Fetching next queue batch: 25 items queued...`,
      `[Proxy Rotator] Swapped proxy IP to 198.51.100.42:8080 (Integrity check passed)`,
      `[Fingerprint Engine] WebGL vendor spoofed: Intel Iris Xe -> Success`,
      `[Execution Unit] Form auto-filled with humanized 120ms keypress delays`,
      `[Database Sync] SQLite WAL commit took 4.2ms. Checkpoint valid.`
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setSimulationLogs((prev) => [...prev.slice(-6), steps[current]]);
        current++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              {project.tag}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 gap-6 bg-slate-50 text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fa-solid fa-circle-info mr-2"></i> Project Details
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fa-solid fa-network-wired mr-2"></i> Architecture & Engineering
          </button>
          {project.category === 'automation' && (
            <button
              onClick={() => setActiveTab('simulation')}
              className={`py-3.5 border-b-2 transition-all cursor-pointer ${
                activeTab === 'simulation'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <i className="fa-solid fa-terminal mr-2"></i> Live Terminal Simulator
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 flex-1 space-y-6">
          {activeTab === 'overview' && (
            <>
              <div>
                <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-2">
                  Comprehensive Summary
                </h4>
                <p className="text-slate-700 leading-relaxed text-base">
                  {project.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-3">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-xs">
                        <i className="fa-solid fa-check"></i>
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-900 text-sm font-bold flex items-center gap-3">
                <i className="fa-solid fa-rocket text-xl text-emerald-600 shrink-0"></i>
                <span>{project.impact}</span>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-3">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2"
                    >
                      <i className={`${tech.icon} ${tech.color}`}></i>
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-sm">
                <div className="font-extrabold flex items-center gap-2 mb-1">
                  <i className="fa-solid fa-diagram-project text-blue-600"></i>
                  <span>Architecture Overview</span>
                </div>
                <p className="text-blue-800 leading-relaxed text-sm">
                  {project.architectureDetails?.overview ||
                    'Architected for zero data corruption, rapid local disk access, and deterministic background operations.'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-extrabold uppercase text-slate-400 tracking-wider mb-3">
                  Engineering Decisions
                </h4>
                <div className="space-y-3">
                  {(
                    project.architectureDetails?.keyDecisions || [
                      'High concurrency with ACID compliant transactional safety.',
                      'Isolated environment executions avoiding memory leaks.'
                    ]
                  ).map((decision, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {decision}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {project.architectureDetails?.performanceMetric && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-bold flex items-center gap-3">
                  <i className="fa-solid fa-gauge-high text-xl text-amber-600 shrink-0"></i>
                  <div>
                    <div className="text-xs uppercase text-amber-700 font-extrabold">
                      Benchmark Metric
                    </div>
                    <div>{project.architectureDetails.performanceMetric}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500 font-mono">
                  Runtime Environment: Python 3.11 / Multi-thread Async
                </div>
                <button
                  onClick={runSimulationStep}
                  disabled={isSimulating}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  <i
                    className={`fa-solid ${
                      isSimulating ? 'fa-spinner fa-spin' : 'fa-play'
                    }`}
                  ></i>
                  <span>{isSimulating ? 'Simulating...' : 'Dispatch Next Batch'}</span>
                </button>
              </div>

              {/* Terminal View */}
              <div className="bg-slate-950 text-emerald-400 font-mono text-xs p-5 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto space-y-2 max-h-72">
                <div className="text-slate-500 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                  <span className="ml-2 text-slate-400">fbmprime-bot-daemon.log</span>
                </div>
                {simulationLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className={log.includes('Success') || log.includes('passed') ? 'text-teal-300' : 'text-emerald-400'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <a
            href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
              `Hi PRO DIGITAL! I am inquiring about the ${project.title} from your portfolio.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] hover:text-emerald-700 font-bold text-sm"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>Discuss Custom Build on WhatsApp</span>
          </a>

          <a
            href={project.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>View Product Details & Buy</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
