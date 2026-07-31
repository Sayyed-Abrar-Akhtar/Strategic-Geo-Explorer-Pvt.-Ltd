'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Icon } from './Icon';

interface ProjectsListProps {
  projects: Project[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dynamically extract all unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {categories.map((category) => {
          const isActive = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl">
          <Icon name="folder-open" className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-sm font-semibold text-slate-950">No projects found</h3>
          <p className="mt-1 text-sm text-slate-600">Try choosing a different capability filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-150/60 shadow-sm hover:shadow-md transition-shadow group"
            >
              {/* Media Container fallback since we don't have real static media assets */}
              <div className="relative h-56 w-full bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 italic font-semibold text-xs p-4 text-center select-none">
                  [Case Study: {project.title}]
                </div>
                {/* Category badge */}
                <span className="absolute bottom-4 left-4 z-20 rounded bg-teal-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                  {project.category}
                </span>
              </div>

              {/* Contents */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <Icon name="map-pin" className="h-3.5 w-3.5 text-teal-600" />
                    <span>{project.location || 'Italy'}</span>
                    <span className="text-slate-300">•</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.excerpt}
                  </p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 hover:text-teal-700 group-hover:translate-x-1 transition-transform"
                  >
                    Read case study
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
