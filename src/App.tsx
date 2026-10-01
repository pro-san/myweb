import React, { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CodeExecutionLab } from './components/CodeExecutionLab';
import { ROICalculator } from './components/ROICalculator';
import { ClientPortalDemo } from './components/ClientPortalDemo';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { ProcessSection } from './components/ProcessSection';
import { QualitySection } from './components/QualitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GlobalReachSection } from './components/GlobalReachSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingTelegram } from './components/FloatingTelegram';
import { BackToTop } from './components/BackToTop';
import { Toast } from './components/Toast';
import { RetroArcadeModal } from './components/RetroArcadeModal';
import { KonamiParticleBurst } from './components/KonamiParticleBurst';
import { useKonamiCode } from './hooks/useKonamiCode';

export default function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isRetroArcadeOpen, setIsRetroArcadeOpen] = useState(false);
  const [showParticleBurst, setShowParticleBurst] = useState(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleTriggerKonami = () => {
    setShowParticleBurst(true);
    setIsRetroArcadeOpen(true);
  };

  // Listen to keyboard Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonamiCode(handleTriggerKonami);

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplySpecToContact = (specSummary: string) => {
    setContactInitialMessage(`Project Specification from Estimator / ROI:\n${specSummary}\n\nAdditional notes: `);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-main)] dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* Scroll Progress Bar at the very top */}
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating Stats Banner */}
      <StatsBanner />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Featured Case Studies Projects Section */}
        <ProjectsSection />

        {/* Live Step-by-Step Code Execution Lab */}
        <CodeExecutionLab />

        {/* Interactive Value & Automation ROI Calculator */}
        <ROICalculator
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onSendSpecToContact={handleApplySpecToContact}
        />

        {/* Live Client Milestone & QA Tracker Demo */}
        <ClientPortalDemo />

        {/* Skills & Tech Stack Section */}
        <SkillsSection />

        {/* Development Process (6-Step) */}
        <ProcessSection />

        {/* Code Quality & QA Testing (Zero Crash Guarantee) */}
        <QualitySection />

        {/* Client Reviews & Testimonials */}
        <TestimonialsSection />

        {/* Global Reach Section with Interactive D3 World Map */}
        <GlobalReachSection
          onContactClick={(region) => handleSelectService(`Project consultation for ${region}`)}
        />

        {/* About Me & Expertise Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection
          initialService={selectedServiceForContact}
          initialMessage={contactInitialMessage}
          onSuccessMessage={() => setShowSuccessToast(true)}
        />

        {/* Frequently Asked Questions Section (Process, Pricing, Timelines) */}
        <FAQSection />
      </main>

      {/* Interactive Project Cost & Timeline Estimator Modal */}
      <ProjectEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplySpecToContact={handleApplySpecToContact}
      />

      {/* Developer Executive Factsheet & Technical CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Footer with Konami Code Easter Egg trigger */}
      <Footer onOpenRetroArcade={handleTriggerKonami} />

      {/* Secret Konami Code Retro Arcade Modal */}
      <RetroArcadeModal
        isOpen={isRetroArcadeOpen}
        onClose={() => setIsRetroArcadeOpen(false)}
      />

      {/* Retro Pixel Particle Burst Celebration */}
      <KonamiParticleBurst
        show={showParticleBurst}
        onComplete={() => setShowParticleBurst(false)}
      />

      {/* Persistent Floating Telegram Action Widget */}
      <FloatingTelegram />

      {/* Floating Back To Top Button */}
      <BackToTop />

      {/* Global Success Feedback Toast */}
      <Toast
        show={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        title="Inquiry Sent Successfully!"
        message="Thank you! PRO DIGITAL has received your message and will reach out shortly."
      />
    </div>
  );
}
