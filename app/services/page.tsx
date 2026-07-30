import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageContent } from '@/lib/api/pages';
import { getServices } from '@/lib/api/services';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';
import { Icon } from '@/components/Icon';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('services');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/services',
    },
  };
}

export default async function ServicesPage() {
  const content = await getPageContent('services');
  const services = await getServices();

  return (
    <main className="flex-grow">
      <PageHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        breadcrumbs={[{ name: 'Our Capabilities', href: '/services' }]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:border-teal-500/20 transition-all duration-300"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-8 border-t border-slate-200/50 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group-hover:translate-x-1 transition-all"
                  >
                    Explore capability
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
