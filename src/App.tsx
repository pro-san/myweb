import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsBanner } from './components/StatsBanner';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CodeExecutionLab } from './components/CodeExecutionLab';
import { ProjectEstimator } from './components/ProjectEstimator';
import { SkillsSection } from './components/SkillsSection';
import { ProcessSection } from './components/ProcessSection';
import { QualitySection } from './components/QualitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { Toast } from './components/Toast';

export default function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplySpecToContact = (specSummary: string) => {
    setContactInitialMessage(`Project Specification from Estimator:\n${specSummary}\n\nAdditional notes: `);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenEstimator={() => setIsEstimatorOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenEstimator={() => setIsEstimatorOpen(true)} />

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

        {/* Skills & Tech Stack Section */}
        <SkillsSection />

        {/* Development Process (6-Step) */}
        <ProcessSection />

        {/* Code Quality & QA Testing (Zero Crash Guarantee) */}
        <QualitySection />

        {/* Client Reviews & Testimonials */}
        <TestimonialsSection />

        {/* About Me & Expertise Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection
          initialService={selectedServiceForContact}
          initialMessage={contactInitialMessage}
          onSuccessMessage={() => setShowSuccessToast(true)}
        />
      </main>

      {/* Interactive Project Cost & Timeline Estimator Modal */}
      <ProjectEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplySpecToContact={handleApplySpecToContact}
      />

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

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
