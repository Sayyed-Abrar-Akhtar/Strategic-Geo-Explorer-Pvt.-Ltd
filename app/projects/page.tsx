import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/api/pages';
import { getProjects } from '@/lib/api/projects';
import { PageHero } from '@/components/PageHero';
import { ProjectsList } from '@/components/ProjectsList';
import { CtaBanner } from '@/components/CtaBanner';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('projects');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/projects',
    },
  };
}

export default async function ProjectsPage() {
  const content = await getPageContent('projects');
  const projects = await getProjects();

  return (
    <main className="flex-grow">
      <PageHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        breadcrumbs={[{ name: 'Case Studies', href: '/projects' }]}
      />

      {/* Grid List section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProjectsList projects={projects} />
        </div>
      </section>

      {content.cta && (
        <CtaBanner
          headline={content.cta.headline}
          buttonLabel={content.cta.buttonLabel}
          buttonHref={content.cta.buttonHref}
        />
      )}
    </main>
  );
}
