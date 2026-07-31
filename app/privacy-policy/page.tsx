import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/api/pages';
import { PageHero } from '@/components/PageHero';
import { CtaBanner } from '@/components/CtaBanner';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('privacy-policy');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/privacy-policy',
    },
  };
}

export default async function PrivacyPolicyPage() {
  const content = await getPageContent('privacy-policy');

  return (
    <main className="flex-grow">
      <PageHero
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        breadcrumbs={[{ name: 'Privacy Policy', href: '/privacy-policy' }]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none space-y-12">
            {content.sections?.map((section) => (
              <div key={section.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                {section.heading && (
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.body?.map((paragraph, index) => (
                  <p key={index} className="text-base text-slate-600 leading-relaxed mt-3">
                    {paragraph}
                  </p>
                ))}
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
