import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'km';

interface Translations {
  [key: string]: {
    en: string;
    km: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  nav_services: { en: 'Services', km: 'សេវាកម្ម' },
  nav_projects: { en: 'Projects', km: 'គម្រោង' },
  nav_code_lab: { en: 'Code Lab', km: 'បន្ទប់កូដ' },
  nav_skills: { en: 'Skills', km: 'ជំនាញ' },
  nav_process: { en: 'Process', km: 'ដំណើរការ' },
  nav_roi: { en: 'ROI Calculator', km: 'គណនាផលសន្សំ' },
  nav_portal: { en: 'Client Portal', km: 'តាមដានគម្រោង' },
  nav_about: { en: 'About Me', km: 'អំពីខ្ញុំ' },
  nav_faq: { en: 'FAQ', km: 'សំណួរញឹកញាប់' },
  nav_contact: { en: 'Contact', km: 'ទំនាក់ទំនង' },
  nav_estimator: { en: 'Estimator', km: 'គណនាថ្លៃ' },
  nav_telegram: { en: 'Telegram Chat', km: 'ជជែកតាម Telegram' },
  nav_theme: { en: 'Appearance Theme', km: 'រូបរាង (Theme)' },
  nav_cv: { en: 'Factsheet & CV', km: 'ប្រវត្តិរូបសង្ខេប' },

  // Hero Section
  hero_badge: {
    en: 'Available for Full-Stack Web Dev & Automation Projects',
    km: 'បើកទទួលគម្រោងអភិវឌ្ឍន៍វេបសាយ និងប្រព័ន្ធស្វ័យប្រវត្តិកម្ម',
  },
  hero_greeting: { en: "Hi, I'm", km: 'ជំរាបសួរ! ខ្ញុំឈ្មោះ' },
  hero_subtitle_tag: { en: 'Full-Stack Dev & Automation', km: 'អ្នកអភិវឌ្ឍន៍ Full-Stack & ស្វ័យប្រវត្តិកម្ម' },
  hero_description: {
    en: 'Specializing in resilient systems: offline desktop management applications with SQLite Write-Ahead-Logging, and high-throughput multi-threaded automation bots with browser fingerprint cloaking.',
    km: 'ឯកទេសខាងការកសាងប្រព័ន្ធរឹងមាំ៖ កម្មវិធីគ្រប់គ្រងក្រៅបណ្តាញ (Offline) ជាមួយ SQLite WAL និង Bot ស្វ័យប្រវត្តិកម្មល្បឿនលឿនការពារការចាប់បាន (Anti-Detection)។',
  },
  hero_btn_projects: { en: 'View Projects', km: 'មើលស្នាដៃគម្រោង' },
  hero_btn_codelab: { en: 'Run Code Lab', km: 'ដំណើរការបន្ទប់កូដ' },
  hero_btn_estimator: { en: 'Cost Estimator', km: 'គណនាថវិកាគម្រោង' },
  hero_btn_cv: { en: 'View Developer CV', km: 'មើលប្រវត្តិរូបបច្ចេកទេស' },

  // Stats
  stat_exp: { en: 'Coding & Dev Experience', km: 'បទពិសោធន៍សរសេរកូដជាក់ស្តែង' },
  stat_satisfaction: { en: 'Client Satisfaction Rate', km: 'កម្រិតពេញចិត្តរបស់អតិថិជន' },
  stat_users: { en: 'Users Impacted Daily', km: 'អ្នកប្រើប្រាស់ប្រចាំថ្ងៃ' },
  stat_reach: { en: 'Organic Reach Scaled', km: 'ការទស្សនាលើប្រព័ន្ធផ្សព្វផ្សាយ' },

  // Services
  services_badge: { en: 'CLIENT SERVICES', km: 'សេវាកម្មជំនាញ' },
  services_title: { en: 'Services I Provide', km: 'សេវាកម្មដែលខ្ញុំផ្តល់ជូន' },
  services_subtitle: {
    en: 'Custom software engineering services tailored to automate business workflows, eliminate human calculation errors, and boost profitability.',
    km: 'សេវាកម្មវិស្វកម្មសូហ្វវែរសម្រាប់ស្វ័យប្រវត្តិកម្មអាជីវកម្ម បំបាត់កំហុសគណនា និងបង្កើនប្រាក់ចំណេញ។',
  },
  services_request_btn: { en: 'Request This Service', km: 'ស្នើសុំសេវាកម្មនេះ' },

  // Projects
  projects_badge: { en: 'CASE STUDIES', km: 'ករណីសិក្សាជាក់ស្តែង' },
  projects_title: { en: 'Featured Software Projects', km: 'គម្រោងសូហ្វវែរលេចធ្លោ' },
  projects_subtitle: {
    en: 'In-depth breakdown of production software applications engineered for high-volume business clients and offline reliability.',
    km: 'ការវិភាគលម្អិតនៃសូហ្វវែរដែលបានដាក់ឱ្យដំណើរការជាក់ស្តែង និងមានសុវត្ថិភាពទិន្នន័យ ១០០%។',
  },
  projects_tab_all: { en: 'All Projects', km: 'គម្រោងទាំងអស់' },
  projects_tab_offline: { en: 'Offline Systems & Property', km: 'ប្រព័ន្ធគ្រប់គ្រងក្រៅបណ្តាញ' },
  projects_tab_automation: { en: 'Bots & Web Automation', km: 'Bot ស្វ័យប្រវត្តិកម្ម' },
  projects_tab_saas: { en: 'APIs & CRM Integrations', km: 'ការតភ្ជាប់ API & ប្រព័ន្ធ' },
  projects_view_details: { en: 'View Product Details & Buy', km: 'មើលព័ត៌មានលម្អិត & ទិញ' },
  projects_architecture_btn: { en: 'Architecture', km: 'ស្ថាបត្យកម្មប្រព័ន្ធ' },

  // Code Lab
  codelab_badge: { en: 'LIVE INTERACTIVE CODE RUNNER', km: 'ដំណើរការកូដជាក់ស្តែងអន្តរកម្ម' },
  codelab_title: { en: 'Step-by-Step Source Code Execution Lab', km: 'បន្ទប់សាកល្បងដំណើរការកូដជាជំហានៗ' },
  codelab_subtitle: {
    en: 'Inspect real production-grade source code functions line-by-line. Step through logic execution, inspect in-memory variables, watch real-time daemon logs, and verify live outputs.',
    km: 'ពិនិត្យមើលកូដផលិតកម្មពិតប្រាកដមួយជួរម្តងៗ។ តាមដានតក្កវិជ្ជា ការផ្លាស់ប្តូរអថេរក្នុងអង្គចងចាំ និងផ្ទៀងផ្ទាត់លទ្ធផលភ្លាមៗ។',
  },

  // ROI Calculator
  roi_badge: { en: 'INTERACTIVE VALUE CALCULATOR', km: 'ឧបករណ៍គណនាផលសន្សំ និងប្រាក់ចំណេញ' },
  roi_title: { en: 'Calculate Your Automation ROI & Savings', km: 'គណនាការសន្សំពេលវេលា និងថវិកាដោយស្វ័យប្រវត្តិកម្ម' },
  roi_subtitle: {
    en: 'See exactly how many hours and dollars custom automation, bot workflows, or offline management systems will save your business every month.',
    km: 'មើលថាតើប្រព័ន្ធស្វ័យប្រវត្តិកម្ម និងសូហ្វវែរផ្ទាល់ខ្លួនអាចជួយសន្សំពេលវេលា និងថវិកាអាជីវកម្មរបស់អ្នកបានប៉ុន្មានរៀងរាល់ខែ។',
  },

  // Client Portal
  portal_badge: { en: 'TRANSPARENCY & QUALITY ASSURANCE', km: 'តម្លាភាព និងការធានាគុណភាព' },
  portal_title: { en: 'Live Client Milestone & QA Tracker Demo', km: 'ការបង្ហាញប្រព័ន្ធតាមដានវឌ្ឍនភាពគម្រោងជាក់ស្តែង' },
  portal_subtitle: {
    en: 'Experience how PRO DIGITAL guarantees 100% transparency with live staging previews, sprint milestone checkpoints, automated test suites, and verified IP delivery.',
    km: 'ទទួលបានបទពិសោធន៍នៃតម្លាភាព ១០០% ជាមួយដំណាក់កាលគម្រោងច្បាស់លាស់ តំណភ្ជាប់ Preview ផ្ទាល់ ការតេស្តស្វ័យប្រវត្តិ និងការប្រគល់កម្មសិទ្ធិបញ្ញាពេញលេញ។',
  },

  // Process
  process_badge: { en: 'WORK PHILOSOPHY', km: 'ទស្សនវិជ្ជាការងារ' },
  process_title: { en: 'How I Work — 6-Step Process', km: 'របៀបដែលខ្ញុំធ្វើការ — ដំណើរការ ៦ ជំហាន' },
  process_subtitle: {
    en: 'A structured, transparent development methodology. Click on any step to inspect deliverables, duration, and architectural artifacts.',
    km: 'វិធីសាស្ត្រអភិវឌ្ឍន៍ប្រកបដោយរចនាសម្ព័ន្ធ និងតម្លាភាព។ ចុចលើជំហាននីមួយៗដើម្បីពិនិត្យលទ្ធផល និងរយៈពេល។',
  },

  // FAQ
  faq_badge: { en: 'FREQUENTLY ASKED QUESTIONS', km: 'សំណួរដែលសួរញឹកញាប់' },
  faq_title: { en: 'Transparent Answers on Process, Pricing & Timelines', km: 'ចម្លើយច្បាស់លាស់អំពីដំណើរការ តម្លៃ និងពេលវេលា' },

  // Contact
  contact_badge: { en: 'GET IN TOUCH', km: 'ទាក់ទងមកខ្ញុំ' },
  contact_title: { en: "Let's Work Together", km: 'តោះចាប់ផ្តើមសហការគ្នា!' },
  contact_subtitle: {
    en: 'Have a web application or automation project in mind? Send a message for an instant estimate and free technical consultation.',
    km: 'មានគម្រោងវេបសាយ ឬស្វ័យប្រវត្តិកម្មដែលចង់កសាង? ផ្ញើសារដើម្បីទទួលបានការប៉ាន់ស្មាន និងការប្រឹក្សាបច្ចេកទេសឥតគិតថ្លៃ។',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fbmprime_lang') as Language | null;
      if (saved === 'en' || saved === 'km') {
        return saved;
      }
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('fbmprime_lang', language);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'km' : 'en'));
  };

  const t = (key: string): string => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
