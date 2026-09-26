import React, { useState, useMemo } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySpecToContact: (specSummary: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  isOpen,
  onClose,
  onApplySpecToContact,
}) => {
  const [projectType, setProjectType] = useState<string>('Custom Web Application');
  const [features, setFeatures] = useState<string[]>([
    'User Auth & Roles',
    'Real-Time Dashboard',
  ]);
  const [urgency, setUrgency] = useState<string>('standard');

  const featureOptions = [
    { id: 'User Auth & Roles', label: 'User Auth & Roles', price: 150 },
    { id: '100% Offline SQLite WAL', label: '100% Offline SQLite WAL Mode', price: 250 },
    { id: 'PDF & Thermal Receipts', label: 'Automated PDF/Thermal Receipts', price: 180 },
    { id: 'Proxy & Anti-Detection', label: 'Multi-Thread Proxy & Anti-Detection', price: 300 },
    { id: 'Payment Gateway', label: 'Stripe/Card Gateway Integration', price: 200 },
    { id: 'Real-Time Dashboard', label: 'Live Real-Time Dashboard', price: 220 },
    { id: 'ViciDial / Webhook Bridge', label: 'ViciDial / Telephony Webhook', price: 280 },
    { id: 'Automated WhatsApp Triggers', label: 'WhatsApp / SMS Instant Alerts', price: 160 },
  ];

  const toggleFeature = (featId: string) => {
    setFeatures((prev) =>
      prev.includes(featId) ? prev.filter((f) => f !== featId) : [...prev, featId]
    );
  };

  const calculation = useMemo(() => {
    let basePrice = 300;
    let baseDays = 7;

    if (projectType === 'Custom Web Application') {
      basePrice = 450;
      baseDays = 10;
    } else if (projectType === 'Automation Bot & Web Scraper') {
      basePrice = 350;
      baseDays = 6;
    } else if (projectType === 'Offline Desktop Management Software') {
      basePrice = 500;
      baseDays = 12;
    } else if (projectType === 'API Integration & ViciDial') {
      basePrice = 300;
      baseDays = 5;
    } else {
      basePrice = 200;
      baseDays = 3;
    }

    const featurePrice = features.reduce((acc, feat) => {
      const found = featureOptions.find((f) => f.id === feat);
      return acc + (found?.price || 100);
    }, 0);

    const featureDays = Math.ceil(features.length * 1.5);

    let multiplier = 1;
    let daysMultiplier = 1;
    if (urgency === 'priority') {
      multiplier = 1.25;
      daysMultiplier = 0.7;
    } else if (urgency === 'express') {
      multiplier = 1.5;
      daysMultiplier = 0.5;
    }

    const estimatedTotal = Math.round((basePrice + featurePrice) * multiplier);
    const estimatedDays = Math.max(3, Math.round((baseDays + featureDays) * daysMultiplier));

    return {
      priceRange: `$${estimatedTotal} - $${Math.round(estimatedTotal * 1.35)}`,
      daysRange: `${estimatedDays} - ${estimatedDays + 4} business days`,
    };
  }, [projectType, features, urgency]);

  if (!isOpen) return null;

  const specSummary = `Project: ${projectType} | Features: ${features.join(', ') || 'Core'} | Urgency: ${urgency} | Est: ${calculation.priceRange}`;

  const sendWhatsAppSpec = () => {
    const text = `Hi PRO DIGITAL! I configured a project estimate on your portfolio:\n- Type: ${projectType}\n- Features: ${features.join(', ') || 'None selected'}\n- Timeline target: ${urgency}\n- Estimated Quote: ${calculation.priceRange}\nCan we discuss starting this?`;
    window.open(
      `https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-calculator"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Instant Project Estimator
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Get an instant timeline and budget ballpark tailored to your technical requirements.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* 1. Project Type */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2.5">
              1. Select Project Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Custom Web Application',
                'Automation Bot & Web Scraper',
                'Offline Desktop Management Software',
                'API Integration & ViciDial',
                'Maintenance & Speed Optimization',
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`p-3 text-left rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    projectType === type
                      ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <i
                    className={`fa-solid ${
                      projectType === type ? 'fa-circle-check text-blue-600' : 'fa-circle text-slate-300'
                    } mr-2`}
                  ></i>
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Select Features */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2.5">
              2. Add Technical Capabilities & Modules
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {featureOptions.map((feat) => {
                const isSelected = features.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/80 text-emerald-900 ring-1 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <i
                        className={`fa-solid ${
                          isSelected ? 'fa-check-square text-emerald-600' : 'fa-square text-slate-300'
                        }`}
                      ></i>
                      <span>{feat.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Delivery Speed */}
          <div>
            <label className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2.5">
              3. Delivery Timeline Priority
            </label>
            <div className="grid grid-cols-3 gap-2.5 text-center">
              {[
                { id: 'standard', label: 'Standard', desc: 'Relaxed pacing' },
                { id: 'priority', label: 'Priority', desc: 'Accelerated' },
                { id: 'express', label: 'Rush / Express', desc: 'Immediate sprint' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setUrgency(tier.id)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    urgency === tier.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-600/20'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div>{tier.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    {tier.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Output Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
                  Estimated Investment
                </span>
                <div className="text-3xl font-black text-white mt-0.5">
                  {calculation.priceRange}
                </div>
                <div className="text-xs text-slate-300 font-medium mt-1">
                  Estimated Timeline: <span className="text-amber-300 font-bold">{calculation.daysRange}</span>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Included Guarantee
                </span>
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 mt-1">
                  <i className="fa-solid fa-shield-halved"></i> Zero-Crash Guarantee & Free QA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onApplySpecToContact(specSummary);
              onClose();
            }}
            className="flex-1 py-3 px-4 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <span>Load Into Contact Form</span>
          </button>

          <button
            onClick={sendWhatsAppSpec}
            className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1eb956] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <i className="fa-brands fa-whatsapp text-lg"></i>
            <span>Send Spec on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
