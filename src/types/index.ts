export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  category: 'saas' | 'automation' | 'offline';
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: { name: string; icon: string; color: string }[];
  impact: string;
  storeUrl: string;
  isFeatured?: boolean;
  architectureDetails?: {
    overview: string;
    keyDecisions: string[];
    performanceMetric: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  colorClass: string;
  bgColorClass: string;
  description: string;
  deliverables: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: { name: string; icon: string; color: string }[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  initials: string;
  rating: number;
}

export interface CodeStep {
  stepNumber: number;
  title: string;
  functionName: string;
  activeLineNumbers: number[];
  explanation: string;
  variables: Record<string, string | number | boolean>;
  logOutput: string;
}

export interface RunnableModule {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  language: string;
  fileName: string;
  codeLines: string[];
  steps: CodeStep[];
}

export interface FaqItem {
  id: string;
  category: 'process' | 'pricing' | 'timeline';
  question: string;
  answer: string;
  highlights?: string[];
}
