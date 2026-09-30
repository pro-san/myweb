import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ROICalculatorProps {
  onOpenEstimator?: () => void;
  onSendSpecToContact?: (spec: string) => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({
  onOpenEstimator,
  onSendSpecToContact,
}) => {
  const { language } = useLanguage();
  const isKhmer = language === 'km';

  // Calculator inputs
  const [teamMembers, setTeamMembers] = useState<number>(3);
  const [dailyHours, setDailyHours] = useState<number>(3.5);
  const [hourlyRate, setHourlyRate] = useState<number>(18);
  const [errorRate, setErrorRate] = useState<number>(5);
  const [solutionType, setSolutionType] = useState<'bot' | 'offline_db' | 'custom_api'>('bot');

  const stats = useMemo(() => {
    // 22 working days per month
    const workingDays = 22;
    const totalMonthlyManualHours = teamMembers * dailyHours * workingDays;

    // Efficiency factors
    const automationRate = solutionType === 'bot' ? 0.90 : solutionType === 'offline_db' ? 0.85 : 0.75;
    const hoursSavedMonthly = Math.round(totalMonthlyManualHours * automationRate);
    const grossCostSavingsMonthly = Math.round(hoursSavedMonthly * hourlyRate);

    // Savings from eliminated billing errors & manual oversights
    const estimatedErrorRecovery = Math.round((totalMonthlyManualHours * hourlyRate) * (errorRate / 100) * 0.6);
    const totalMonthlyBenefit = grossCostSavingsMonthly + estimatedErrorRecovery;
    const annualSavings = totalMonthlyBenefit * 12;

    // Estimated software investment for this profile
    const estimatedOneTimeCost = solutionType === 'bot' ? 1200 : solutionType === 'offline_db' ? 1500 : 950;
    const paybackDays = Math.max(7, Math.round((estimatedOneTimeCost / totalMonthlyBenefit) * 30));

    return {
      hoursSavedMonthly,
      grossCostSavingsMonthly,
      estimatedErrorRecovery,
      totalMonthlyBenefit,
      annualSavings,
      estimatedOneTimeCost,
      paybackDays,
    };
  }, [teamMembers, dailyHours, hourlyRate, errorRate, solutionType]);

  const handleApplyToContact = () => {
    const summary = `Automation ROI Calculation:\n- Team Size: ${teamMembers} members\n- Daily Manual Effort: ${dailyHours} hrs/day\n- Hourly Rate: $${hourlyRate}/hr\n- Target Solution: ${solutionType.toUpperCase()}\n- Projected Monthly Savings: $${stats.totalMonthlyBenefit.toLocaleString()} / ${stats.hoursSavedMonthly} hrs saved`;

    if (onSendSpecToContact) {
      onSendSpecToContact(summary);
    } else {
      const contactElem = document.getElementById('contact');
      contactElem?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="roi-calculator" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-b border-slate-200 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <i className="fa-solid fa-calculator text-emerald-600 dark:text-emerald-400"></i>
            <span>{isKhmer ? 'ឧបករណ៍គណនាផលសន្សំ' : 'INTERACTIVE VALUE CALCULATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            {isKhmer
              ? 'គណនាផលចំណេញ និងការសន្សំថវិកាដោយស្វ័យប្រវត្តិកម្ម'
              : 'Calculate Your Automation ROI & Cost Savings'}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {isKhmer
              ? 'មើលថាតើប្រព័ន្ធស្វ័យប្រវត្តិកម្ម កម្មវិធីគ្រប់គ្រង ឬ Bot ផ្ទាល់ខ្លួនអាចជួយកាត់បន្ថយពេលវេលា និងសន្សំប្រាក់បានប៉ុន្មានរៀងរាល់ខែ។'
              : 'Quantify the financial return before commissioning your build. Calculate exact labor hours reclaimed, error reduction, and your breakeven timeline.'}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Box (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
              <i className="fa-solid fa-sliders text-blue-600 dark:text-blue-400"></i>
              <span>{isKhmer ? 'កំណត់ប៉ារ៉ាម៉ែត្រអាជីវកម្មរបស់អ្នក' : 'Your Team & Operational Parameters'}</span>
            </h3>

            {/* Target Solution Selector */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2.5">
                {isKhmer ? 'ប្រភេទដំណោះស្រាយដែលចង់បាន' : 'Select Solution Focus'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bot', label: isKhmer ? 'Bot ស្វ័យប្រវត្តិកម្ម' : 'Automation Bot', icon: 'fa-robot' },
                  { id: 'offline_db', label: isKhmer ? 'កម្មវិធីគ្រប់គ្រងក្រៅបណ្តាញ' : 'Offline DB App', icon: 'fa-database' },
                  { id: 'custom_api', label: isKhmer ? 'ប្រព័ន្ធតភ្ជាប់ API' : 'Custom API', icon: 'fa-network-wired' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSolutionType(type.id as any)}
                    className={`py-3 px-2 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      solutionType === type.id
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-500 dark:border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <i className={`fa-solid ${type.icon} text-base`}></i>
                    <span className="text-center leading-tight">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Team Members */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>{isKhmer ? 'ចំនួនបុគ្គលិកដែលធ្វើការងារដោយផ្ទាល់ដៃ' : 'Team Members Doing Manual Work'}</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                  {teamMembers} {isKhmer ? 'នាក់' : 'people'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={teamMembers}
                onChange={(e) => setTeamMembers(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 person</span>
                <span>12 people</span>
                <span>25 people</span>
              </div>
            </div>

            {/* Slider 2: Daily Hours Spent */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>{isKhmer ? 'ម៉ោងចំណាយលើការងារដដែលៗ (ក្នុងម្នាក់/ថ្ងៃ)' : 'Manual Hours Spent Per Person / Day'}</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
                  {dailyHours} {isKhmer ? 'ម៉ោង' : 'hrs/day'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 hr (Routine)</span>
                <span>4 hrs (Heavy)</span>
                <span>8 hrs (Full Time)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Wage Rate */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>{isKhmer ? 'តម្លៃពលកម្មជាមធ្យម ($/ម៉ោង)' : 'Average Staff Hourly Labor Cost ($/hr)'}</span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-sm">
                  ${hourlyRate}/hr
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="60"
                step="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>$8/hr (Entry/Remote)</span>
                <span>$30/hr (Mid Agency)</span>
                <span>$60/hr (Senior/US)</span>
              </div>
            </div>

            {/* Slider 4: Human Error Rate */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>{isKhmer ? 'អត្រាកំហុសគណនាដោយដៃ (Overlooked Errors)' : 'Manual Entry Error / Dispute Rate'}</span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-sm">
                  {errorRate}%
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={errorRate}
                onChange={(e) => setErrorRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1% (Low)</span>
                <span>8% (Moderate)</span>
                <span>15% (High Chaos)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-slate-900 via-[#0a1e3f] to-[#1e3c72] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    {isKhmer ? '★ ផលសន្សំសរុបប្រចាំខែ' : '★ Projected Monthly Value Reclaimed'}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ${stats.totalMonthlyBenefit.toLocaleString()}
                    <span className="text-lg sm:text-xl font-normal text-slate-300">/mo</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    {isKhmer
                      ? `សន្សំបានប្រមាណ $${stats.annualSavings.toLocaleString()} ក្នុងមួយឆ្នាំ!`
                      : `Yielding ~$${stats.annualSavings.toLocaleString()} in annual efficiency & retained revenue.`}
                  </p>
                </div>

                {/* Metric Breakdown Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <div className="bg-white/10 backdrop-blur p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] text-slate-300 font-semibold mb-0.5">
                      {isKhmer ? 'ម៉ោងសន្សំប្រចាំខែ' : 'Hours Saved / Mo'}
                    </div>
                    <div className="text-2xl font-black text-sky-400">
                      {stats.hoursSavedMonthly.toLocaleString()} hrs
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">
                      ~{Math.round(stats.hoursSavedMonthly / 8)} full work days
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur p-3.5 rounded-2xl border border-white/10">
                    <div className="text-[11px] text-slate-300 font-semibold mb-0.5">
                      {isKhmer ? 'រយៈពេលរួចដើម' : 'Breakeven Payback'}
                    </div>
                    <div className="text-2xl font-black text-amber-400">
                      {stats.paybackDays} {isKhmer ? 'ថ្ងៃ' : 'Days'}
                    </div>
                    <div className="text-[10px] text-slate-300 mt-0.5">
                      {isKhmer ? 'រួចថ្លៃដើមយ៉ាងលឿន' : 'Fast 1-time amortization'}
                    </div>
                  </div>
                </div>

                {/* Key Advantages */}
                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-circle-check text-emerald-400 shrink-0"></i>
                    <span>{isKhmer ? 'គ្មានកំហុសគណនា ០% តាមបែបវិស្វកម្ម' : '0% calculation & billing oversight guarantee'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-circle-check text-emerald-400 shrink-0"></i>
                    <span>{isKhmer ? 'ដំណើរការ ២៤/៧ មិនចេះនឿយហត់' : '24/7 background automation with zero employee fatigue'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <i className="fa-solid fa-circle-check text-emerald-400 shrink-0"></i>
                    <span>{isKhmer ? 'កម្មសិទ្ធិបញ្ញា និងកូដ ១០០% ជារបស់អ្នក' : '100% full IP & source code ownership transferred'}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 space-y-2.5">
                  <button
                    onClick={handleApplyToContact}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                    <span>{isKhmer ? 'ស្នើសុំផែនការស្វ័យប្រវត្តិនេះ' : 'Get Custom Automation Plan for this Spec'}</span>
                  </button>

                  <a
                    href={`${PERSONAL_INFO.telegramUrl}?text=${encodeURIComponent(
                      `Hi PRO DIGITAL! My automation ROI calculation projects $${stats.totalMonthlyBenefit.toLocaleString()}/mo in savings (${stats.hoursSavedMonthly} hrs). Can we discuss building this system?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#24A1DE] hover:bg-[#1e88be] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow transition-all duration-200 cursor-pointer"
                  >
                    <i className="fa-brands fa-telegram text-base"></i>
                    <span>{isKhmer ? 'ពិភាក្សាលើ Telegram ភ្លាមៗ' : 'Discuss ROI on Telegram'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Benchmark Note */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-blue-600 dark:text-blue-400"></i>
                <span>{isKhmer ? 'ការធានារបស់ PRO DIGITAL' : 'PRO DIGITAL Operational Standard'}</span>
              </div>
              <p>
                {isKhmer
                  ? 'រាល់ប្រព័ន្ធដែលបានបង្កើតឡើង ត្រូវបានធានាគ្មានគាំង (Zero-Crash) ដំណើរការល្បឿនលឿន និងមានការធានាជួសជុល ៣០ ថ្ងៃដោយមិនគិតថ្លៃ។'
                  : 'Every deployed software solution comes with a 30-day bug warranty, stress-tested concurrent query queues, and complete architecture documentation.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
