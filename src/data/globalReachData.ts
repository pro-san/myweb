export interface GlobalCountryData {
  id: 'US' | 'CA' | 'UK' | 'KH';
  isoNumeric: number;
  name: string;
  nameKm: string;
  flag: string;
  cityNode: string;
  cityNodeKm: string;
  coordinates: [number, number]; // [longitude, latitude]
  color: string;
  bgGlow: string;
  badge: string;
  badgeKm: string;
  isHQ?: boolean;
  projects: string[];
  projectsKm: string[];
  metrics: {
    primaryNumber: string;
    primaryLabel: string;
    primaryLabelKm: string;
    timezone: string;
    latency: string;
  };
  summary: string;
  summaryKm: string;
}

export const GLOBAL_COUNTRIES: GlobalCountryData[] = [
  {
    id: 'US',
    isoNumeric: 840,
    name: 'United States',
    nameKm: 'សហរដ្ឋអាមេរិក',
    flag: '🇺🇸',
    cityNode: 'Virginia & California Nodes',
    cityNodeKm: 'តំបន់ Virginia & California',
    coordinates: [-98.5795, 39.8283],
    color: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.4)',
    badge: 'Enterprise Automation Clients',
    badgeKm: 'អតិថិជនស្វ័យប្រវត្តិកម្មអាជីវកម្ម',
    projects: [
      'FBM Prime Multi-threaded Listing Bot',
      'Anti-Detection Headless Browser Automation',
      'Proxy Rotation & Cloud Daemons',
      'Automated Inventory Price Scrapers',
    ],
    projectsKm: [
      'FBM Prime Bot បង្ហោះទំនិញស្វ័យប្រវត្តិ',
      'ប្រព័ន្ធ Browsing ក្លែងបន្លំ Fingerprint',
      'ការប្តូរ Proxy & Cloud Daemons',
      'ប្រព័ន្ធទាញយកតម្លៃទំនិញ Real-time',
    ],
    metrics: {
      primaryNumber: '12+ Bots',
      primaryLabel: 'Active Automated Workers',
      primaryLabelKm: 'Bot កំពុងដំណើរការ 24/7',
      timezone: 'UTC-5 (EST) / UTC-8 (PST)',
      latency: '110ms API Ping',
    },
    summary:
      'Engineered enterprise e-commerce automation scripts and cloud bots with residential proxy cloaking, eliminating hours of manual product listing.',
    summaryKm:
      'បានបង្កើតប្រព័ន្ធ Bot ស្វ័យប្រវត្តិកម្មពាណិជ្ជកម្មអេឡិចត្រូនិក និង Cloud Worker ការពារការចាប់បាន ជួយសន្សំពេលវេលារាប់ម៉ោងជារៀងរាល់ថ្ងៃ។',
  },
  {
    id: 'CA',
    isoNumeric: 124,
    name: 'Canada',
    nameKm: 'កាណាដា',
    flag: '🇨🇦',
    cityNode: 'Toronto & Vancouver Gateways',
    cityNodeKm: 'តំបន់ Toronto & Vancouver',
    coordinates: [-106.3468, 56.1304],
    color: '#0284c7',
    bgGlow: 'rgba(2, 132, 199, 0.4)',
    badge: 'Inventory & CRM Pipelines',
    badgeKm: 'ប្រព័ន្ធគ្រប់គ្រងទំនិញ & CRM',
    projects: [
      'Real-Time Webhook Multi-Channel Sync',
      'Automated Order Tracking Dispatches',
      'Custom Analytics & Reconciliation Dashboards',
      'Cross-Platform API Middleware',
    ],
    projectsKm: [
      'ការតភ្ជាប់ Webhook សមកាលកម្មពហុឆានែល',
      'ប្រព័ន្ធផ្ញើលេខតាមដានការបញ្ជាទិញស្វ័យប្រវត្តិ',
      'ផ្ទាំងគ្រប់គ្រងទិន្នន័យចំណូល-ចំណាយ',
      'ប្រព័ន្ធ Middleware តភ្ជាប់ API',
    ],
    metrics: {
      primaryNumber: '99.98%',
      primaryLabel: 'Daemon Pipeline Uptime',
      primaryLabelKm: 'ស្ថិរភាពប្រព័ន្ធដំណើរការ',
      timezone: 'UTC-5 (EST)',
      latency: '125ms API Ping',
    },
    summary:
      'Engineered resilient webhook connectors and automated order delivery bridges connecting independent retail stores to fulfillment centers.',
    summaryKm:
      'បង្កើតប្រព័ន្ធ Webhook និង API ដ៏រឹងមាំសម្រាប់តភ្ជាប់ហាងលក់រាយជាមួយឃ្លាំងស្តុក និងការដឹកជញ្ជូន។',
  },
  {
    id: 'UK',
    isoNumeric: 826,
    name: 'United Kingdom',
    nameKm: 'ចក្រភពអង់គ្លេស',
    flag: '🇬🇧',
    cityNode: 'London & Manchester Telecom Nodes',
    cityNodeKm: 'តំបន់ London & Manchester',
    coordinates: [-3.436, 55.3781],
    color: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.4)',
    badge: 'VoIP Telecom & WhatsApp Bridges',
    badgeKm: 'ប្រព័ន្ធ VoIP & WhatsApp ស្វ័យប្រវត្តិ',
    projects: [
      'Vicidial Call Center Real-Time Integration',
      'Instant WhatsApp CRM Dispatcher Engine',
      'Customer Lead Routing & Disposition Webhooks',
      'Multi-tenant Support Ticket Daemons',
    ],
    projectsKm: [
      'ការតភ្ជាប់ Vicidial Call Center ភ្លាមៗ',
      'ប្រព័ន្ធផ្ញើសារ WhatsApp ស្វ័យប្រវត្តិទៅកាន់ភ្ញៀវ',
      'ប្រព័ន្ធបែងចែកអតិថិជនសក្តានុពល',
      'ប្រព័ន្ធគ្រប់គ្រងសំបុត្រជំនួយ (Support Tickets)',
    ],
    metrics: {
      primaryNumber: '4,500+',
      primaryLabel: 'Daily Leads Dispatched',
      primaryLabelKm: 'ចំនួនសារស្វ័យប្រវត្តិ/ថ្ងៃ',
      timezone: 'UTC+0 (GMT) / UTC+1 (BST)',
      latency: '160ms API Ping',
    },
    summary:
      'Built mission-critical telecommunications bridge for commercial call centers, triggering automated WhatsApp follow-ups within 2.1 seconds of call completion.',
    summaryKm:
      'កសាងប្រព័ន្ធតភ្ជាប់ទូរគមនាគមន៍សម្រាប់ Call Center ផ្ញើសារតាមដាន WhatsApp ដោយស្វ័យប្រវត្តិត្រឹមតែ ២.១ វិនាទីក្រោយបញ្ចប់ការហៅទូរស័ព្ទ។',
  },
  {
    id: 'KH',
    isoNumeric: 116,
    name: 'Cambodia (Engineering HQ)',
    nameKm: 'កម្ពុជា (ការិយាល័យកណ្តាល)',
    flag: '🇰🇭',
    cityNode: 'Phnom Penh (St2002)',
    cityNodeKm: 'រាជធានីភ្នំពេញ (ផ្លូវ ២០០២)',
    coordinates: [104.9282, 12.5657],
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.5)',
    badge: 'Primary Architecture & R&D Hub',
    badgeKm: 'មជ្ឈមណ្ឌលស្រាវជ្រាវ & វិស្វកម្មចម្បង',
    isHQ: true,
    projects: [
      'Hostel Management System (SQLite WAL Engine)',
      'Offline Desktop POS & Thermal Receipt Generators',
      'High-Throughput Bot Architecture Lab',
      'Local Enterprise Automation Consultations',
    ],
    projectsKm: [
      'ប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល/សណ្ឋាគារ (SQLite WAL)',
      'កម្មវិធីគិតប្រាក់លើកុំព្យូទ័រ Offline & ព្រីនវិក្កយបត្រ',
      'បន្ទប់ពិសោធន៍ Bot ស្វ័យប្រវត្តិកម្មល្បឿនលឿន',
      'ការប្រឹក្សាបច្ចេកវិទ្យាអាជីវកម្មក្នុងស្រុក',
    ],
    metrics: {
      primaryNumber: '100%',
      primaryLabel: 'Offline Resilience & ACID',
      primaryLabelKm: 'សុវត្ថិភាពទិន្នន័យ ១០០%',
      timezone: 'UTC+7 (Indochina Time)',
      latency: '< 5ms Local WAL Bus',
    },
    summary:
      'Headquarters and primary laboratory where local commercial systems like the Hostel Management Software and offline SQLite WAL engines are engineered and tested.',
    summaryKm:
      'ការិយាល័យកណ្តាល និងមន្ទីរពិសោធន៍កូដ ដែលប្រព័ន្ធគ្រប់គ្រងផ្ទះជួល និងម៉ាស៊ីន SQLite WAL ក្រៅបណ្តាញត្រូវបានរចនា និងធ្វើតេស្តផ្ទាល់។',
  },
];
