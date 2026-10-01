import { ProjectItem, ServiceItem, SkillCategory, TestimonialItem, FaqItem } from '../types';

export const PERSONAL_INFO = {
  name: 'PRO DIGITAL',
  title: 'Full-Stack Web Developer & Automation Systems Engineer',
  brandName: 'FBMPrime',
  experienceYears: '3+',
  telegramHandle: '@kim_san145',
  telegramUrl: 'https://t.me/kim_san145',
  whatsappNumber: '+92 324 1703901',
  whatsappRaw: '923241703901',
  whatsappMessage: 'Hi PRO DIGITAL! I saw your portfolio and want to hire you for a project.',
  email: 'kimsan@dev.com',
  githubUrl: 'https://github.com/mrtechpk1-ai/FBMprime',
  avatarUrl: '/profile.png',
  driveProfileUrl: 'https://drive.google.com/file/d/1YXKf2l1o1dCC5SPxNdv1TGAAbChA9Y6K/view?usp=drivesdk',
  location: 'Cambodia (St2002, Phnom Penh, KH, 90115)',
  locationMapUrl: 'https://maps.app.goo.gl/gjZyiR7zwDgvrpKy5?g_st=ac',
  formspreeEndpoint: 'https://formspree.io/f/xqpkebro',
};

export const STATS = [
  { value: '3+ Years', label: 'Coding & Dev Experience', icon: 'fa-calendar-check', color: 'text-blue-600', bg: 'bg-blue-50' },
  { value: '100%', label: 'Client Satisfaction Rate', icon: 'fa-star', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: '1,000+', label: 'Users Impacted Daily', icon: 'fa-users', color: 'text-amber-500', bg: 'bg-amber-50' },
  { value: '10M+', label: 'Organic Reach Scaled', icon: 'fa-chart-line', color: 'text-rose-600', bg: 'bg-rose-50' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hostel-management-system',
    title: 'Hostel Management System',
    tag: 'PROPERTY TECH & DESKTOP SAAS',
    category: 'offline',
    isFeatured: true,
    description: 'A 100% offline desktop management software built to replace paper registers, prevent calculation errors, and automate daily hostel operations.',
    longDescription: 'Engineered specifically for hostel chains and commercial student residences. Unlike cloud-only tools that fail during internet outages, this system runs locally with SQLite Write-Ahead Logging (WAL mode), guaranteeing concurrent access, instant receipt printing, and zero data corruption.',
    highlights: [
      'Automated partial-month rent & dynamic PDF receipt generation with 1-click thermal/A4 printing.',
      'Real-time P&L analytics, occupancy tracking, and student bio-data / guardian record vault.',
      'Built-in staff payroll advance tracking, meal plan management, and utility deduction logs.',
      'Automated daily backup engine with encrypted exports for hassle-free data portability.'
    ],
    techStack: [
      { name: 'Python', icon: 'fa-brands fa-python', color: 'text-blue-500' },
      { name: 'Flask', icon: 'fa-solid fa-pepper-hot', color: 'text-red-500' },
      { name: 'SQLite WAL', icon: 'fa-solid fa-database', color: 'text-sky-500' },
      { name: 'ReportLab PDF', icon: 'fa-solid fa-file-pdf', color: 'text-rose-500' },
      { name: 'Tailwind / JS', icon: 'fa-solid fa-code', color: 'text-teal-500' }
    ],
    impact: 'Reduced manual paperwork by 95% & manages 1,000+ beds daily with 0% data loss.',
    storeUrl: 'https://fbmprime.store/hostelmanagementsystem',
    architectureDetails: {
      overview: 'Hybrid local webview architecture pairing lightweight Flask microservice with SQLite WAL for multi-process concurrency without requiring heavy database servers.',
      keyDecisions: [
        'SQLite in Write-Ahead-Log (WAL) mode enables concurrent reads without locking write transactions.',
        'Client-side print styling triggers native OS printer dialogs in under 200ms.',
        'Zero-cloud dependency guarantees uptime even during regional connectivity outages.'
      ],
      performanceMetric: '<15ms local query response & 95% reduction in administrative billing hours.'
    }
  },
  {
    id: 'fbmprime-bot',
    title: 'FBM Prime Bot',
    tag: 'AUTOMATION & SAAS ENGINE',
    category: 'automation',
    isFeatured: true,
    description: 'A robust multi-threaded background automation bot engineered for bulk account management, profile creation, and automated marketplace posting.',
    longDescription: 'High-throughput automation system designed to eliminate repetitive browser operations for digital agencies and e-commerce merchants. Built with dynamic proxy rotation, humanized jitter typing, canvas fingerprint spoofing, and resilient anti-detection pipelines.',
    highlights: [
      'Browser fingerprint spoofing (WebGL, Canvas, AudioContext, Navigator) & intelligent proxy rotation.',
      'Automated multi-step form submissions, listing creation, and CAPTCHA solving hooks.',
      'Real-time execution dashboard with live CLI status logs, error traps, and bulk orchestration.',
      'Configurable sleep intervals and human-like typing simulation to bypass algorithmic rate limits.'
    ],
    techStack: [
      { name: 'Python', icon: 'fa-brands fa-python', color: 'text-blue-500' },
      { name: 'Selenium', icon: 'fa-solid fa-bug', color: 'text-emerald-500' },
      { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-600' },
      { name: 'Puppeteer', icon: 'fa-solid fa-spider', color: 'text-amber-500' },
      { name: 'Proxy Pool', icon: 'fa-solid fa-network-wired', color: 'text-indigo-500' }
    ],
    impact: 'Automated 1,000+ account workflows & scaled organic reach to 10M+ views.',
    storeUrl: 'https://fbmprime.store/fbmprime-bot',
    architectureDetails: {
      overview: 'Multi-threaded worker pool orchestrating distributed browser contexts with dynamic proxy rotation and automated session state persistence.',
      keyDecisions: [
        'Isolated browser profiles prevent cookie and cache leakage across worker instances.',
        'Adaptive backoff retries on network latency or temporary cloudflare challenge encounters.',
        'Automated task queuing with JSON-based recipe definitions for scalable workflow creation.'
      ],
      performanceMetric: 'Over 10,000 tasks executed daily with 99.4% automation completion rate.'
    }
  },
  {
    id: 'vicidial-crm-bridge',
    title: 'ViciDial CRM & Lead Automation Bridge',
    tag: 'TELEPHONY & API INTEGRATION',
    category: 'saas',
    isFeatured: false,
    description: 'Custom RESTful API bridge syncing incoming and outgoing tele-sales records between ViciDial auto-dialers and custom CRM databases.',
    longDescription: 'Engineered for call centers and sales teams to eliminate manual disposition logging, automate WhatsApp lead follow-ups upon call hangup, and stream real-time agent metrics into central executive dashboards.',
    highlights: [
      'Bidirectional webhook listener capturing call status, recording links, and agent dispositions.',
      'Automated WhatsApp and SMS notification dispatch to interested prospects within 5 seconds.',
      'Real-time live queue monitor showing active agents, dropped call percentage, and conversion ratios.'
    ],
    techStack: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-green-600' },
      { name: 'Express', icon: 'fa-solid fa-server', color: 'text-slate-600' },
      { name: 'MySQL', icon: 'fa-solid fa-table', color: 'text-blue-600' },
      { name: 'WebSockets', icon: 'fa-solid fa-bolt', color: 'text-amber-500' }
    ],
    impact: 'Doubled agent callback velocity and eliminated 15+ hours of manual data entry per week.',
    storeUrl: 'https://wa.me/923241703901?text=Hi%20PRO%20DIGITAL!%20I%20am%20interested%20in%20a%20ViciDial%20or%20CRM%20Integration'
  },
  {
    id: 'retail-inventory-offline',
    title: 'Offline POS & Inventory Master',
    tag: 'RETAIL COMMERCE',
    category: 'offline',
    isFeatured: false,
    description: 'High-speed barcode-ready point of sale and stock tracking software with local SQLite database and cloud sync backup.',
    longDescription: 'Created for retail stores, electronics distributors, and wholesale warehouses where checkout speed cannot be compromised by unstable ISP connections.',
    highlights: [
      'Sub-50ms barcode scanning and instant thermal receipt printing.',
      'Low-stock threshold alerts with supplier reorder purchase order generation.',
      'Daily reconciliation audits preventing cash drawer discrepancies.'
    ],
    techStack: [
      { name: 'React', icon: 'fa-brands fa-react', color: 'text-cyan-500' },
      { name: 'Python', icon: 'fa-brands fa-python', color: 'text-blue-500' },
      { name: 'SQLite', icon: 'fa-solid fa-database', color: 'text-sky-500' }
    ],
    impact: 'Handled over 50,000 monthly transactions without a single checkout crash or drop.',
    storeUrl: 'https://wa.me/923241703901?text=Hi%20PRO%20DIGITAL!%20I%20am%20interested%20in%20an%20Offline%20POS%20system'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-web-dev',
    title: 'Custom Web App Dev',
    icon: 'fa-code',
    colorClass: 'text-blue-600',
    bgColorClass: 'bg-blue-50',
    description: 'Building fast, responsive web applications and custom SaaS portals using modern React.js, Node.js, and Python backend engines.',
    deliverables: [
      'Tailored UI/UX with responsive mobile-first architecture',
      'Modern React, TypeScript, and high-performance server APIs',
      'Secure user authentication and role-based access control',
      'Production deployment on AWS, Vercel, or custom VPS'
    ]
  },
  {
    id: 'automation-bots',
    title: 'Automation & Bot Eng.',
    icon: 'fa-robot',
    colorClass: 'text-emerald-600',
    bgColorClass: 'bg-emerald-50',
    description: 'Developing multi-threaded web scrapers, data entry bots, auto-fill scripts, and social media automation engines for digital agencies.',
    deliverables: [
      'Multi-threaded scraping pipelines with dynamic proxy rotation',
      'Browser fingerprint spoofing and CAPTCHA handling',
      'Automated spreadsheet imports & background data pipelines',
      'Bulk task orchestration with visual error logs'
    ]
  },
  {
    id: 'management-systems',
    title: 'Management Systems',
    icon: 'fa-calculator',
    colorClass: 'text-amber-500',
    bgColorClass: 'bg-amber-50',
    description: 'Custom management software for hostels, schools, retail inventory, and sales CRMs with robust 100% offline local database support.',
    deliverables: [
      '100% offline-ready SQLite WAL mode architectures',
      'Instant thermal & PDF printable invoice / receipt generators',
      'Comprehensive accounting & daily profit/loss summaries',
      'Student, tenant, or customer bio-data record managers'
    ]
  },
  {
    id: 'api-integration',
    title: 'API Development & Integration',
    icon: 'fa-network-wired',
    colorClass: 'text-indigo-600',
    bgColorClass: 'bg-indigo-50',
    description: 'Connecting third-party services, payment gateways, auto-dialers (ViciDial), and engineering secure RESTful API architectures.',
    deliverables: [
      'Custom webhook listeners and bi-directional synchronizers',
      'Stripe, PayPal, or local merchant gateway integrations',
      'ViciDial telephony automation and lead distribution hooks',
      'Clean Postman documentation & OpenAPI specifications'
    ]
  },
  {
    id: 'maintenance-optimization',
    title: 'Maintenance & Speed Opt.',
    icon: 'fa-screwdriver-wrench',
    colorClass: 'text-rose-600',
    bgColorClass: 'bg-rose-50',
    description: 'Optimizing web page performance, fixing legacy bugs, setting up database indexing, and securing server hosting environments.',
    deliverables: [
      'Sub-second page load tuning and Core Web Vitals optimization',
      'Database query indexing and WAL mode crash elimination',
      'Legacy script refactoring and dependency upgrades',
      'Server hardening, SSL setup, and automated backup cron jobs'
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    icon: 'fa-desktop',
    color: 'text-blue-600',
    skills: [
      { name: 'HTML5', icon: 'fa-brands fa-html5', color: 'text-orange-500' },
      { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: 'text-blue-500' },
      { name: 'JavaScript (ES6+)', icon: 'fa-brands fa-js', color: 'text-yellow-500' },
      { name: 'React.js', icon: 'fa-brands fa-react', color: 'text-cyan-500' },
      { name: 'Bootstrap 5', icon: 'fa-brands fa-bootstrap', color: 'text-purple-500' },
      { name: 'Tailwind CSS', icon: 'fa-solid fa-palette', color: 'text-teal-500' }
    ]
  },
  {
    title: 'Backend & Server',
    icon: 'fa-server',
    color: 'text-emerald-600',
    skills: [
      { name: 'Node.js', icon: 'fa-brands fa-node-js', color: 'text-emerald-600' },
      { name: 'Express.js', icon: 'fa-solid fa-network-wired', color: 'text-slate-600' },
      { name: 'Python', icon: 'fa-brands fa-python', color: 'text-blue-600' },
      { name: 'Flask / Django', icon: 'fa-solid fa-flask', color: 'text-indigo-600' },
      { name: 'RESTful APIs', icon: 'fa-solid fa-gears', color: 'text-sky-600' }
    ]
  },
  {
    title: 'Database Systems',
    icon: 'fa-database',
    color: 'text-amber-500',
    skills: [
      { name: 'MySQL', icon: 'fa-solid fa-table', color: 'text-blue-600' },
      { name: 'SQLite (WAL Mode)', icon: 'fa-solid fa-box', color: 'text-emerald-600' },
      { name: 'Firebase', icon: 'fa-solid fa-fire', color: 'text-amber-500' },
      { name: 'PostgreSQL', icon: 'fa-solid fa-database', color: 'text-sky-600' }
    ]
  },
  {
    title: 'Automation & Web Scraping',
    icon: 'fa-robot',
    color: 'text-purple-600',
    skills: [
      { name: 'Selenium WebDriver', icon: 'fa-solid fa-bug', color: 'text-rose-500' },
      { name: 'Puppeteer / Playwright', icon: 'fa-solid fa-spider', color: 'text-slate-700' },
      { name: 'Multi-Threaded Bots', icon: 'fa-solid fa-bolt', color: 'text-amber-500' },
      { name: 'Browser Fingerprint Protection', icon: 'fa-solid fa-fingerprint', color: 'text-cyan-600' },
      { name: 'Auto Form Filling & Scripts', icon: 'fa-solid fa-terminal', color: 'text-emerald-600' }
    ]
  },
  {
    title: 'Tools, DevOps & Deployment',
    icon: 'fa-cloud-arrow-up',
    color: 'text-rose-600',
    skills: [
      { name: 'Git & GitHub', icon: 'fa-brands fa-git-alt', color: 'text-red-500' },
      { name: 'Postman API Testing', icon: 'fa-solid fa-paper-plane', color: 'text-orange-500' },
      { name: 'Vercel / Netlify Deployment', icon: 'fa-solid fa-globe', color: 'text-blue-500' },
      { name: 'ViciDial / CRM Systems', icon: 'fa-solid fa-phone-volume', color: 'text-purple-500' },
      { name: 'PDF Receipt Generators', icon: 'fa-solid fa-file-pdf', color: 'text-red-600' }
    ]
  }
];

export const PROCESS_STEPS = [
  { step: '1', title: 'Discovery', description: 'Understand business goals, target bottlenecks, and core project requirements.' },
  { step: '2', title: 'Planning', description: 'System architecture, database schema design, and offline reliability blueprinting.' },
  { step: '3', title: 'Development', description: 'Clean modular code, ultra-fast backend APIs, and pixel-perfect UI build.' },
  { step: '4', title: 'Testing', description: 'Rigorous QA, edge-case simulation, security validation, and high-load stress testing.' },
  { step: '5', title: 'Delivery', description: 'Live production deployment, database seeding, and seamless client walkthrough.' },
  { step: '6', title: 'Support', description: 'Ongoing maintenance, proactive monitoring, and lifetime bug-free updates.' }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'hk',
    quote: 'PRO DIGITAL built our entire Hostel Management System. The automatic partial-day rent calculation and printable PDF receipts saved us dozens of hours every month. Flawless offline database performance!',
    author: 'Hostel Owner & General Manager',
    role: 'Commercial Student Housing',
    project: 'Hostel Management Software',
    initials: 'HK',
    rating: 5
  },
  {
    id: 'mk',
    quote: 'The automation tool PRO DIGITAL engineered scaled our social media reach beyond 10M+ organic views. Their multi-threading and fingerprint protection algorithms are top-tier engineering!',
    author: 'E-Commerce Agency Director',
    role: 'Growth & Digital Scale',
    project: 'FBM Prime Automation Engine',
    initials: 'MK',
    rating: 5
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'process-workflow',
    category: 'process',
    question: 'What does your end-to-end development process look like?',
    answer:
      'We operate with an agile 6-phase engineering lifecycle: 1) Initial discovery and technical requirements scoping, 2) Architecture blueprinting and data schema design, 3) Iterative milestone development with live preview deployments, 4) Rigorous QA unit/integration testing and zero-crash stress testing, 5) Production rollout with DNS & cloud deployment, and 6) 30-day post-launch warranty with ongoing support.',
    highlights: [
      'Continuous Git commits & live staging links',
      'Direct asynchronous communication via Telegram/Slack',
      'Comprehensive architecture blueprints & documentation',
    ],
  },
  {
    id: 'process-ip-ownership',
    category: 'process',
    question: 'Do I get 100% full ownership of the source code and IP?',
    answer:
      'Yes, absolutely. Upon completion and approval of the final project milestone, 100% of all intellectual property, private GitHub repositories, Docker compose scripts, CI/CD pipelines, and configuration keys are formally transferred to you. There is zero vendor lock-in and no recurring proprietary license fees.',
    highlights: [
      '100% legal intellectual property assignment',
      'Clean, documented Git history & repository transfer',
      'Zero vendor lock-in or proprietary dependencies',
    ],
  },
  {
    id: 'process-updates',
    category: 'process',
    question: 'How frequently will I receive progress updates during development?',
    answer:
      'You are never left in the dark. We provide regular progress summaries via Telegram or Slack, live preview links updated continuously on every Git commit, and asynchronous video walk-throughs demonstrating each newly implemented feature before moving forward.',
    highlights: [
      'Daily/bi-daily status checkpoints via Telegram',
      'Live staging environment updated on every commit',
      'Interactive video walkthroughs for feature validation',
    ],
  },
  {
    id: 'process-tech-stack',
    category: 'process',
    question: 'What technologies and frameworks do you build with?',
    answer:
      'We tailor our technology choice to the exact performance demands of your application. For modern web: React 18/19, Next.js, TypeScript, and Tailwind CSS. For backend & microservices: Node.js, Python (FastAPI/Flask), Go, and SQLite WAL/PostgreSQL. For scraping & automation: Puppeteer, Playwright, Selenium, anti-detect proxy networks, and Redis queue workers.',
    highlights: [
      'Modern TypeScript & React/Next.js frontend',
      'High-throughput Python & Node.js backend systems',
      'Containerized Docker & cloud-native deployments',
    ],
  },
  {
    id: 'pricing-structure',
    category: 'pricing',
    question: 'How are project quotes calculated, and what are your payment terms?',
    answer:
      'We provide transparent fixed-price milestone billing based on technical scope, architecture complexity, and estimated engineering hours. Standard contracts are split into milestone gates (typically 30% upfront deposit to initiate discovery/architecture, 40% upon working staging demo, and 30% on final production delivery).',
    highlights: [
      'Transparent itemized fixed-price quotes',
      'Milestone-based payment gates tied to real deliverables',
      'Zero surprise invoices or unapproved billable hours',
    ],
  },
  {
    id: 'pricing-payment-methods',
    category: 'pricing',
    question: 'What payment methods do you accept from international clients?',
    answer:
      'We partner with clients globally across North America, Europe, the UK, Australia, and Asia. We support direct Bank Wire (via Wise / Swift), Payoneer, Upwork/Freelance escrow contracts, and major Cryptocurrencies (USDT, USDC, BTC) for fast, low-fee cross-border settlements.',
    highlights: [
      'Wise & International Wire Transfer',
      'Escrow protection options available',
      'USDT / USDC / Crypto supported for instant settlement',
    ],
  },
  {
    id: 'pricing-scope-changes',
    category: 'pricing',
    question: 'What happens if I need changes or extra features mid-project?',
    answer:
      'Requirements can evolve as you test working prototypes. When you need extra features, we supply a clear modular add-on scope with the exact timeline and cost adjustment before writing any code. Your core budget and milestone dates remain predictable and protected.',
    highlights: [
      'Modular scope change quotes before implementation',
      'No surprise budget inflation',
      'Guaranteed preservation of core release schedule',
    ],
  },
  {
    id: 'timeline-standard-delivery',
    category: 'timeline',
    question: 'How long does a typical software project take to deliver?',
    answer:
      'Timelines correspond directly to system scope: Landing pages and simple MVPs typically take 3 to 7 business days; full-stack web applications, portals, and SaaS platforms take 2 to 4 weeks; desktop and offline systems take 2 to 3 weeks; while custom browser automation bots and scraping pipelines take 1 to 2 weeks.',
    highlights: [
      'MVPs & Landing Pages: 3–7 business days',
      'Full-Stack Web Apps: 2–4 weeks',
      'Automation Bots & Scrapers: 1–2 weeks',
    ],
  },
  {
    id: 'timeline-rush-sprints',
    category: 'timeline',
    question: 'Can you handle urgent deadlines or emergency rush sprints?',
    answer:
      'Yes. For time-critical product launches, high-stakes investor demos, or urgent bug remediations, we provide expedited rush sprints (delivering working MVPs or automated bots within 48 to 72 hours) with focused, dedicated engineering bandwidth.',
    highlights: [
      'Expedited 48–72 hour rush sprints available',
      'Dedicated engineering priority allocation',
      'Rapid turnaround without sacrificing code quality',
    ],
  },
  {
    id: 'timeline-post-launch-warranty',
    category: 'timeline',
    question: 'What kind of warranty and post-launch support do you provide?',
    answer:
      'Every delivered project includes an unconditional 30-day post-launch warranty covering any bug fixes, configuration adjustments, and server deployment troubleshooting at no additional cost. We also provide ongoing monthly SLA maintenance agreements for continuous enhancement and server management.',
    highlights: [
      'Complimentary 30-day bug warranty on all code',
      'Assisted production server & DNS deployment',
      'Optional monthly SLA maintenance packages',
    ],
  },
];

