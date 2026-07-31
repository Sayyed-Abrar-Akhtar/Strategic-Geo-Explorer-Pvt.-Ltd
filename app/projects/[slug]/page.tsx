import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, getProjects } from '@/lib/api/projects';
import { getServiceBySlug } from '@/lib/api/services';
import { getArticleJsonLd } from '@/lib/seo/jsonld';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';
import { Icon } from '@/components/Icon';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Engineering Case Studies`,
    description: project.excerpt,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com';
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const articleJsonLd = getArticleJsonLd(project, projectUrl, 'Project');

  const breadcrumbs = [
    { name: 'Case Studies', href: '/projects' },
    { name: project.title, href: `/projects/${project.slug}` },
  ];

  // Resolve related services
  const relatedServices = [];
  if (project.relatedServiceSlugs) {
    for (const serviceSlug of project.relatedServiceSlugs) {
      const svc = await getServiceBySlug(serviceSlug);
      if (svc) relatedServices.push(svc);
    }
  }

  return (
    <main className="flex-grow">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero
        eyebrow={`Case Study / ${project.category}`}
        headline={project.title}
        breadcrumbs={breadcrumbs}
      />

      <section className="py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* Left Column: Case study full text description & gallery */}
            <div className="lg:col-span-2 space-y-12">

              {/* Media Block representing site work */}
              <div className="relative h-96 w-full rounded-2xl bg-slate-900 overflow-hidden shadow-sm border border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 italic font-semibold text-sm select-none">
                  [Featured Case Study Image: {project.title}]
                </div>
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1.5 rounded bg-teal-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                  <Icon name="image" className="h-4 w-4" />
                  Primary Site Capture
                </div>
              </div>

              {/* Rich descriptions paragraphs */}
              <div className="prose prose-slate max-w-none">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
                  Project Intervention and Engineering Methodology
                </h3>
                <div className="space-y-6 text-base text-slate-700 leading-relaxed">
                  {project.description.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Mock Gallery representational list */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="pt-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
                    Photo Logs & Geological Charts
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {project.gallery.map((img, index) => (
                      <div
                        key={index}
                        className="relative h-44 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 italic text-xs p-4 text-center select-none"
                      >
                        [Intervention Record {index + 1}]
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Key Details & Associated Services */}
            <div className="lg:col-span-1 space-y-8">

              {/* Project Meta Information Card */}
              <div className="rounded-2xl border border-slate-150 bg-slate-50 p-6">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-4 mb-4">
                  Project Parameters
                </h3>

                <dl className="space-y-4 text-sm">
                  {project.client && (
                    <div>
                      <dt className="font-semibold text-slate-500">Client</dt>
                      <dd className="mt-1 font-bold text-slate-900">{project.client}</dd>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <dt className="font-semibold text-slate-500">Location</dt>
                      <dd className="mt-1 font-bold text-slate-900 flex items-center gap-1.5">
                        <Icon name="map-pin" className="h-4 w-4 text-teal-600 shrink-0" />
                        {project.location}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-semibold text-slate-500">Year Completed</dt>
                    <dd className="mt-1 font-bold text-slate-900">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Intervention Classification</dt>
                    <dd className="mt-1">
                      <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-700 ring-1 ring-inset ring-teal-600/10">
                        {project.category}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Cross-linked capabilities Card */}
              {relatedServices.length > 0 && (
                <div className="rounded-2xl border border-slate-150 bg-white p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
                    Involved Technical Fields
                  </h3>
                  <ul className="space-y-3">
                    {relatedServices.map((svc) => (
                      <li key={svc.id}>
                        <Link
                          href={`/services/${svc.slug}`}
                          className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-teal-600 transition-colors group"
                        >
                          <div className="flex h-7 w-7 items-center justify-center rounded bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                            <Icon name={svc.icon} className="h-4 w-4 shrink-0" />
                          </div>
                          <span className="font-semibold truncate">{svc.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      <CtaBanner
        headline="Have similar geological or environmental characterization needs? Partner with our experts."
        buttonLabel="Request Project Evaluation"
        buttonHref="/contact"
      />
    </main>
  );
}
