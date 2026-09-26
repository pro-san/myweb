import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'offline' | 'automation' | 'saas'>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (selectedFilter === 'all') return true;
    return proj.category === selectedFilter;
  });

  return (
    <section id="projects" className="py-20 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-wider font-extrabold text-blue-700 bg-blue-100/80 border border-blue-300 rounded-full px-4 py-1 mb-3">
            CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Featured Software Projects
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded mx-auto mb-4"></div>
          <p className="text-slate-600 text-base sm:text-lg">
            In-depth breakdown of production software applications engineered for high-volume business clients and offline reliability.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'offline', label: 'Offline Systems & Property' },
              { id: 'automation', label: 'Bots & Web Automation' },
              { id: 'saas', label: 'APIs & CRM Integrations' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isFeatured = project.isFeatured;
            const isHostel = project.id === 'hostel-management-system';

            return (
              <div
                key={project.id}
                className={`group relative bg-white rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border flex flex-col justify-between ${
                  isFeatured
                    ? isHostel
                      ? 'border-purple-200 ring-1 ring-purple-100'
                      : 'border-blue-200 ring-1 ring-blue-100'
                    : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${
                          isHostel
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            isHostel ? 'fa-hotel' : 'fa-robot'
                          }`}
                        ></i>
                      </div>
                      <span
                        className={`text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full border ${
                          isHostel
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {project.tag}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Inspect technical architecture"
                    >
                      <i className="fa-solid fa-layer-group text-slate-400"></i>
                      <span className="hidden sm:inline">Deep Dive</span>
                    </button>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Highlights list */}
                  <div className="mb-6">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {project.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <i className="fa-solid fa-circle-check text-emerald-500 mt-0.5 text-sm shrink-0"></i>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs hover:-translate-y-0.5 transition-transform"
                      >
                        <i className={`${tech.icon} ${tech.color}`}></i>
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>

                  {/* Impact callout */}
                  <div
                    className={`p-3.5 rounded-xl text-xs font-bold mb-6 text-center border ${
                      isHostel
                        ? 'bg-purple-50/70 border-purple-200 text-purple-900'
                        : 'bg-blue-50/70 border-blue-200 text-blue-900'
                    }`}
                  >
                    🚀 Impact: {project.impact}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={project.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-sm py-3.5 px-4 rounded-xl text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
                      isHostel
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                        : 'bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700'
                    }`}
                  >
                    <span>View Product Details & Buy</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </a>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="sm:w-auto px-4 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-code-branch text-slate-400"></i>
                    <span>Architecture</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-dive Architecture & Specs Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
