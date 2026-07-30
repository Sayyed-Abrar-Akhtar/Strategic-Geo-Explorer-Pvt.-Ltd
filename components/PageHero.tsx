import React from 'react';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

interface PageHeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({ eyebrow, headline, subheadline, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 py-16 sm:py-20 text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <div className="mb-6 rounded-md bg-white/5 backdrop-blur-sm px-4 py-1.5 inline-block border border-white/10">
            <Breadcrumbs items={breadcrumbs} variant="dark" />
          </div>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400 ring-1 ring-inset ring-teal-400/20 mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl">
              {subheadline}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
