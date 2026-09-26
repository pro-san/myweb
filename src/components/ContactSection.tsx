import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
  onSuccessMessage?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialMessage,
  onSuccessMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (initialService) {
      if (initialService.includes('Web')) setService('Custom Web Application Development');
      else if (initialService.includes('Automation') || initialService.includes('Bot'))
        setService('Automation Tool / Bot Engineering');
      else if (initialService.includes('Management') || initialService.includes('Hostel'))
        setService('Hostel / Management System Inquiry');
      else setService('Other Development Project');
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('_subject', 'New Contact from Portfolio Website');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('service', service);
      formData.append('message', message);

      const response = await fetch(PERSONAL_INFO.formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        if (onSuccessMessage) {
          onSuccessMessage();
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-emerald-700 bg-emerald-100/80 border border-emerald-300 rounded-full px-4 py-1 mb-3">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Let's Work Together
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            Have a web application or automation project in mind? Send a message for an instant estimate and free technical consultation.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Info Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] via-[#16274a] to-[#1e3c72] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Background glowing decorations */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white mb-2">
                Contact Info
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Fill out the project form and I will get back to you within 24 hours with an architecture roadmap.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
                    PERSONAL_INFO.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div>
                    <div className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
                      WhatsApp Direct
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white">
                      {PERSONAL_INFO.whatsappNumber}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <div className="text-xs uppercase font-extrabold text-blue-300 tracking-wider">
                      Email Address
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white break-all">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-slate-700 text-amber-400 flex items-center justify-center text-xl shadow-md">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div>
                    <div className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">
                      Location
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick availability pill */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Accepting new client contracts & bot architectures</span>
            </div>
          </div>

          {/* Right Contact Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2.5">
                  <span>Send a Message</span>
                  <i className="fa-solid fa-paper-plane text-blue-600 text-lg"></i>
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  * Required fields
                </span>
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-emerald-600 text-lg mt-0.5"></i>
                  <div>
                    <div className="font-bold">Message Delivered!</div>
                    <div className="mt-0.5">
                      PRO DIGITAL will respond via email or WhatsApp shortly.
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-start gap-3">
                  <i className="fa-solid fa-triangle-exclamation text-rose-600 text-lg mt-0.5"></i>
                  <div>
                    <div className="font-bold">Submission Notice</div>
                    <div className="mt-0.5">
                      Could not dispatch form. You can chat directly on WhatsApp:{' '}
                      <a
                        href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold text-emerald-700"
                      >
                        {PERSONAL_INFO.whatsappNumber}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 text-sm text-slate-900 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 text-sm text-slate-900 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
                    Project Type / Subject *
                  </label>
                  <select
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 text-sm text-slate-900 transition-all outline-none"
                  >
                    <option value="">-- Select Service Needed --</option>
                    <option value="Custom Web Application Development">
                      Custom Web Application Development
                    </option>
                    <option value="Automation Tool / Bot Engineering">
                      Automation Tool / Bot Engineering
                    </option>
                    <option value="Hostel / Management System Inquiry">
                      Hostel / Management System Inquiry
                    </option>
                    <option value="Other Development Project">
                      Other Development Project
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">
                    Message / Project Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project goals, timeline, or requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 text-sm text-slate-900 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-base"></i>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message Now</span>
                      <i className="fa-solid fa-paper-plane text-sm"></i>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Encrypted via Formspree Endpoint</span>
              <a
                href={`https://wa.me/${PERSONAL_INFO.whatsappRaw}?text=${encodeURIComponent(
                  'Hi PRO DIGITAL! I would prefer to chat directly on WhatsApp about my project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-bold flex items-center gap-1"
              >
                <i className="fa-brands fa-whatsapp"></i> Chat on WhatsApp Instead
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
