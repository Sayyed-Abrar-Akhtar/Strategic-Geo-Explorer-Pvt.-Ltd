import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getServices } from '@/lib/api/services';
import { getProjects } from '@/lib/api/projects';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';
import { Icon } from '@/components/Icon';

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Technical Capabilities`,
    description: service.shortDescription,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Find related projects cross-referenced with this service slug
  const allProjects = await getProjects();
  const relatedProjects = allProjects.filter((p) =>
    p.relatedServiceSlugs?.includes(service.slug)
  );

  const breadcrumbs = [
    { name: 'Our Capabilities', href: '/services' },
    { name: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <main className="flex-grow">
      <PageHero
        eyebrow="Specialist Capability"
        headline={service.title}
        breadcrumbs={breadcrumbs}
      />

      <section className="py-16 bg-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

            {/* Left Col: Main Rich Description details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:p-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white shrink-0">
                    <Icon name={service.icon} className="h-5.5 w-5.5" />
                  </div>
                  Scope of Interventions
                </h2>
                <div className="space-y-6">
                  {service.fullDescription.map((paragraph, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-base text-slate-700 leading-relaxed">
                        {paragraph}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects cross-link */}
              {relatedProjects.length > 0 && (
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-6">
                    Featured Case Studies Involving {service.title}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {relatedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-xl border border-slate-150 bg-white p-5 hover:shadow-md transition-shadow group flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                            {project.category}
                          </span>
                          <h4 className="font-bold text-slate-900 mt-1.5 group-hover:text-teal-700 transition-colors leading-snug">
                            {project.title}
                          </h4>
                          <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                            {project.excerpt}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 group-hover:translate-x-0.5 transition-transform"
                          >
                            Read project report
                            <Icon name="arrow-right" className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Secondary links or contacts card */}
            <div className="space-y-6 lg:col-span-1">
              <div className="rounded-2xl border border-slate-150 bg-slate-900 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-44 w-44 bg-teal-500/10 rounded-full blur-2xl"></div>

                <h3 className="text-lg font-bold">Request Specialist Estimate</h3>
                <p className="mt-3 text-sm text-slate-300 leading-normal">
                  Our multidisciplinary directors review technical requisitions and map preliminary soil risks immediately.
                </p>

                <div className="mt-6 space-y-4 text-xs text-slate-300 border-t border-slate-800 pt-6">
                  <div className="flex items-center gap-2.5">
                    <Icon name="phone" className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>Inquiries: +39 011 555 1234</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Icon name="mail" className="h-4 w-4 text-teal-400 shrink-0" />
                    <span>contact@apexgeoconsulting.com</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="flex w-full items-center justify-center rounded bg-teal-600 py-2.5 text-center text-xs font-semibold text-white shadow hover:bg-teal-700 transition-colors"
                  >
                    Send Briefing Document
                  </Link>
                </div>
              </div>

              {/* Service list mini nav */}
              <div className="rounded-2xl border border-slate-150 bg-white p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
                  All Engineering Areas
                </h3>
                <ul className="space-y-2.5">
                  {(await getServices()).map((s) => {
                    const isCurrent = s.slug === service.slug;
                    return (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.slug}`}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            isCurrent
                              ? 'text-teal-600 font-semibold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Icon name={s.icon} className={`h-4.5 w-4.5 shrink-0 ${isCurrent ? 'text-teal-600' : 'text-slate-400'}`} />
                          <span className="truncate">{s.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CtaBanner
        headline="Looking for certified geognostic or remediation designs? Let's discuss."
        buttonLabel="Contact Our Engineers"
        buttonHref="/contact"
      />
    </main>
  );
}
