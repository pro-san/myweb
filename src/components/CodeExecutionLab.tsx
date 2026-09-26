import React, { useState, useEffect, useRef } from 'react';
import { RUNNABLE_MODULES } from '../data/runnableModulesData';
import { RunnableModule, CodeStep } from '../types';

export const CodeExecutionLab: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('hostel-engine');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1800);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Custom interactive parameters for Hostel Engine
  const [tenantName, setTenantName] = useState('Zayn Malik');
  const [roomNumber, setRoomNumber] = useState('B-204');
  const [monthlyRent, setMonthlyRent] = useState(300);
  const [checkinDay, setCheckinDay] = useState(12);

  // Custom interactive parameters for FBM Prime Bot
  const [botTask, setBotTask] = useState('Bulk Listing Orchestration');
  const [proxyRegion, setProxyRegion] = useState('US-East');
  const [threadCount, setThreadCount] = useState(8);

  // Custom interactive parameters for ViciDial Bridge
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 382-9912');
  const [disposition, setDisposition] = useState('INTERESTED');

  const activeModule: RunnableModule =
    RUNNABLE_MODULES.find((m) => m.id === selectedModuleId) || RUNNABLE_MODULES[0];
  const activeStep: CodeStep = activeModule.steps[currentStepIndex] || activeModule.steps[0];

  // Auto-play timer
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setTimeout(() => {
        if (currentStepIndex < activeModule.steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    } else if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [isPlaying, currentStepIndex, activeModule.steps.length, playbackSpeed]);

  const handleModuleChange = (id: string) => {
    setSelectedModuleId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeModule.codeLines.join('\n'));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Dynamic calculations for Hostel
  const calculatedDaysInMonth = 30;
  const remainingDays = Math.max(1, calculatedDaysInMonth - checkinDay + 1);
  const calculatedProratedRent = Number(
    ((monthlyRent / calculatedDaysInMonth) * remainingDays).toFixed(2)
  );

  return (
    <section id="code-lab" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(37,99,235,0.12)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>LIVE INTERACTIVE CODE RUNNER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Step-by-Step Source Code Execution Lab
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Inspect real production-grade source code functions line-by-line. Step through logic execution, inspect in-memory variables, watch real-time daemon logs, and verify live outputs.
          </p>
        </div>

        {/* Module Selection Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {RUNNABLE_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => handleModuleChange(mod.id)}
              className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                selectedModuleId === mod.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/50 scale-102'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <i
                className={`fa-solid ${
                  mod.id === 'hostel-engine'
                    ? 'fa-hotel'
                    : mod.id === 'fbmprime-bot-engine'
                    ? 'fa-robot'
                    : 'fa-phone-volume'
                }`}
              ></i>
              <span>{mod.title.split(':')[0]}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 text-blue-300 font-mono">
                {mod.language}
              </span>
            </button>
          ))}
        </div>

        {/* Workstation Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
          {/* Workstation Top Action Bar */}
          <div className="p-4 sm:p-5 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                <i className="fa-regular fa-file-code text-blue-400"></i>
                <span className="font-semibold">{activeModule.fileName}</span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:inline">
                {activeModule.codeLines.length} lines • {activeModule.steps.length} Steps Execution
              </span>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                title="Previous execution step"
              >
                <i className="fa-solid fa-backward-step"></i>
                <span className="hidden sm:inline">Prev Step</span>
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-black'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                <span>{isPlaying ? 'Pause Runner' : 'Auto Run'}</span>
              </button>

              <button
                onClick={() =>
                  setCurrentStepIndex((prev) =>
                    Math.min(activeModule.steps.length - 1, prev + 1)
                  )
                }
                disabled={currentStepIndex === activeModule.steps.length - 1}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                title="Next execution step"
              >
                <span>Next Step</span>
                <i className="fa-solid fa-forward-step"></i>
              </button>

              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset to Step 1"
              >
                <i className="fa-solid fa-rotate-left text-xs"></i>
              </button>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Copy entire source code"
              >
                <i className={`fa-solid ${copiedCode ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                <span className="hidden md:inline">{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800/80">
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 sm:pb-0">
              {activeModule.steps.map((step, idx) => {
                const isCurrent = idx === currentStepIndex;
                const isPassed = idx < currentStepIndex;
                return (
                  <button
                    key={step.stepNumber}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600/30 border border-blue-500 text-blue-300 font-bold'
                        : isPassed
                        ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-blue-500 text-white'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPassed ? <i className="fa-solid fa-check text-[9px]"></i> : step.stepNumber}
                    </span>
                    <span className="truncate max-w-[130px] sm:max-w-[200px]">
                      {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual-Pane Code & Execution Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Left Pane: Code Viewer with Highlighted Active Execution Lines */}
            <div className="lg:col-span-6 p-4 sm:p-6 bg-slate-950/60 font-mono text-xs overflow-x-auto max-h-[580px] select-text">
              <div className="space-y-1">
                {activeModule.codeLines.map((line, idx) => {
                  const lineNumber = idx + 1;
                  const isActive = activeStep.activeLineNumbers.includes(lineNumber);

                  return (
                    <div
                      key={idx}
                      className={`flex items-start rounded-md px-2 py-0.5 transition-colors duration-150 ${
                        isActive
                          ? 'bg-blue-600/25 border-l-4 border-blue-400 text-blue-100 font-bold shadow-sm'
                          : 'text-slate-300 hover:bg-slate-900/50'
                      }`}
                    >
                      <span className="w-8 shrink-0 text-slate-600 text-right pr-3 select-none text-[11px]">
                        {lineNumber}
                      </span>
                      <pre className="flex-1 whitespace-pre font-mono text-[12px] leading-relaxed">
                        {line}
                      </pre>
                      {isActive && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-bold select-none shrink-0 animate-pulse">
                          EXECUTING
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Pane: State Inspection, Daemon Logs & Live Artifact */}
            <div className="lg:col-span-6 p-4 sm:p-6 bg-slate-900/40 flex flex-col justify-between max-h-[580px] overflow-y-auto space-y-6">
              {/* Step Title & Explanation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Step {activeStep.stepNumber} of {activeModule.steps.length}: {activeStep.functionName}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    ACID Thread Safe
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {activeStep.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                  {activeStep.explanation}
                </p>
              </div>

              {/* Dynamic In-Memory Variable Inspector */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  <span>In-Memory Variables (Call Stack Frame)</span>
                  <span className="text-blue-400 text-[10px]">Stack Level 0</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono text-xs">
                  {Object.entries(activeStep.variables).map(([k, v]) => (
                    <div key={k} className="p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                      <div className="text-[10px] text-slate-500 truncate">{k}</div>
                      <div className="text-amber-300 font-bold truncate mt-0.5">
                        {String(v)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Logs Stdout */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  <span>Runtime Console Stdout</span>
                  <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Daemon Active
                  </span>
                </div>
                <div className="bg-black/90 text-emerald-400 p-3.5 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{activeStep.logOutput}</pre>
                </div>
              </div>

              {/* Live Rendered Output Artifact */}
              {selectedModuleId === 'hostel-engine' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 text-purple-400">
                      <i className="fa-solid fa-receipt"></i> Live Thermal / PDF Receipt Preview
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/30 text-xs font-mono transition-colors cursor-pointer"
                    >
                      <i className="fa-solid fa-print mr-1"></i> Print Ticket
                    </button>
                  </div>

                  {/* Thermal Receipt Visual Ticket */}
                  <div className="bg-amber-50/95 text-slate-900 p-4 rounded-xl shadow-lg font-mono text-xs max-w-xs mx-auto border border-amber-200">
                    <div className="text-center border-b border-dashed border-slate-400 pb-2 mb-2">
                      <div className="font-extrabold text-sm tracking-tight text-slate-950">
                        PRO DIGITAL HOSTELS
                      </div>
                      <div className="text-[10px] text-slate-600">OFFLINE DESKTOP WAL ENGINE</div>
                      <div className="text-[10px] text-slate-500">Receipt: REC-HMS-01042</div>
                    </div>
                    <div className="space-y-1 text-[11px] mb-2">
                      <div className="flex justify-between">
                        <span>Tenant:</span>
                        <span className="font-bold">{tenantName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room Assigned:</span>
                        <span className="font-bold">{roomNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Base Monthly:</span>
                        <span>${monthlyRent}.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Move-in Day:</span>
                        <span>Day {checkinDay} of 30</span>
                      </div>
                      <div className="flex justify-between font-extrabold border-t border-dashed border-slate-400 pt-1 text-slate-950 text-xs">
                        <span>TOTAL DUE:</span>
                        <span className="text-emerald-700">${calculatedProratedRent}</span>
                      </div>
                    </div>
                    <div className="text-center pt-2 border-t border-dashed border-slate-400 text-[9px] text-slate-500">
                      Checksum: SHA256-9A7F3E8B1C • Status: PAID
                    </div>
                  </div>
                </div>
              )}

              {selectedModuleId === 'fbmprime-bot-engine' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <i className="fa-solid fa-fingerprint"></i> Anti-Detection Browser Viewport
                    </span>
                    <span className="text-xs text-emerald-400 font-mono">Status: Cloaked</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
                      <span>Target Node:</span>
                      <span className="text-amber-300 font-bold">198.51.100.42:8080 (Virginia)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5">
                      <span>Canvas Noise Seed:</span>
                      <span className="text-emerald-400">0x7F9B2C4D (Anti-hash match)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Spoofed GPU:</span>
                      <span className="text-sky-300">Intel(R) Iris(R) Xe Graphics</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedModuleId === 'vicidial-whatsapp-bridge' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <i className="fa-brands fa-whatsapp text-sm"></i> Instant Customer Phone Simulation
                    </span>
                    <span className="text-xs text-emerald-400 font-mono">Delivered in 2.1s</span>
                  </div>

                  {/* Simulated Mobile WhatsApp Chat Bubble */}
                  <div className="bg-[#0b141a] p-3.5 rounded-2xl border border-slate-800 text-xs max-w-sm mx-auto shadow-xl">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        PD
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">PRO DIGITAL Dispatch</div>
                        <div className="text-[10px] text-emerald-400">Verified Business Account</div>
                      </div>
                    </div>
                    <div className="bg-[#005c4b] text-white p-3 rounded-xl shadow-md text-xs leading-relaxed">
                      <p>
                        Hi <strong className="text-amber-300">{customerName}</strong>! 👋 Thanks for speaking with our team today regarding your custom software inquiry.
                      </p>
                      <p className="mt-1.5 text-slate-200">
                        Here is your direct specification link: <span className="underline text-sky-200">fbmprime.store/spec-overview</span>
                      </p>
                      <div className="text-right text-[10px] text-emerald-200 mt-1 flex items-center justify-end gap-1">
                        <span>Just now</span>
                        <i className="fa-solid fa-check-double text-sky-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Parameter Customizer Modal / Drawer */}
        <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-sliders text-blue-400"></i>
                <span>Adjust Live Parameters & Re-execute Functions</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Change variables in real-time to observe how the underlying algorithms and outputs recalculate dynamically.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(true);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <i className="fa-solid fa-play"></i>
              <span>Re-run from Step 1</span>
            </button>
          </div>

          {selectedModuleId === 'hostel-engine' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Tenant Name
                </label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Room Number
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Monthly Rent Rate ($)
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Check-in Day of Month ({checkinDay}/30)
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={checkinDay}
                  onChange={(e) => setCheckinDay(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer mt-2"
                />
              </div>
            </div>
          )}

          {selectedModuleId === 'fbmprime-bot-engine' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Task Execution Type
                </label>
                <select
                  value={botTask}
                  onChange={(e) => setBotTask(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option>Bulk Listing Orchestration</option>
                  <option>Profile Warmup & Session Store</option>
                  <option>Marketplace Price Arbitrage Scraper</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Proxy Geolocation
                </label>
                <select
                  value={proxyRegion}
                  onChange={(e) => setProxyRegion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="US-East">US-East (Virginia - Latency 38ms)</option>
                  <option value="US-West">US-West (California - Latency 44ms)</option>
                  <option value="EU-Central">EU-Central (Frankfurt - Latency 41ms)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Thread Worker Count: {threadCount} Threads
                </label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={threadCount}
                  onChange={(e) => setThreadCount(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer mt-2"
                />
              </div>
            </div>
          )}

          {selectedModuleId === 'vicidial-whatsapp-bridge' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                  Disposition Status
                </label>
                <select
                  value={disposition}
                  onChange={(e) => setDisposition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="INTERESTED">INTERESTED (Triggers WhatsApp)</option>
                  <option value="SALE">SALE (Triggers Invoice + WhatsApp)</option>
                  <option value="CALLBK">CALLBK (Triggers Reminder)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
