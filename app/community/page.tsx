import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/api/pages';
import { getCommunityInitiatives } from '@/lib/api/community';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';
import { Icon } from '@/components/Icon';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('community');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/community',
    },
  };
}

export default async function CommunityPage() {
  const content = await getPageContent('community');
  const initiatives = await getCommunityInitiatives();

  return (
    <main className="flex-grow">
      <PageHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        breadcrumbs={[{ name: 'Community Outreach', href: '/community' }]}
      />

      {/* Intro Text Sections */}
      {content.sections && content.sections.length > 0 && (
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            {content.sections.map((section) => (
              <div key={section.id} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {section.heading}
                  </h2>
                )}
                {section.body?.map((p, idx) => (
                  <p key={idx} className="text-lg text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid of Initiatives */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {initiatives.map((item) => {
              // Convert date string to neat local format
              const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <article
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Decorative / Solid placeholder for images */}
                  <div className="relative h-64 w-full bg-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-semibold italic text-sm p-4 text-center">
                      [Community Initiative Image: {item.title}]
                    </div>
                    {/* fallback image representation */}
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 rounded bg-teal-600 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                      <Icon name="calendar" className="h-3.5 w-3.5" />
                      {formattedDate}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
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
