import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/api/pages';
import { getValueProps } from '@/lib/api/valueProps';
import { getStats } from '@/lib/api/stats';
import { getTeamMembers } from '@/lib/api/team';
import { PageHero } from '@/components/PageHero';
import { ValuePropsSection } from '@/components/ValuePropsSection';
import { StatsSection } from '@/components/StatsSection';
import { CtaBanner } from '@/components/CtaBanner';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('about');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/about',
    },
  };
}

export default async function AboutPage() {
  const content = await getPageContent('about');
  const valueProps = await getValueProps();
  const stats = await getStats();
  const team = await getTeamMembers();

  const introSection = content.sections?.find((s) => s.id === 'intro');
  const teamHeaderSection = content.sections?.find((s) => s.id === 'team-header');

  const teamHeading = teamHeaderSection?.heading || 'Meet Our Consultants';
  const teamSubheading = teamHeaderSection?.body?.[0] || 'A multidisciplinary collective of certified geologists, environmental modeling engineers, and regulatory specialists.';

  return (
    <main className="flex-grow">
      <PageHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        breadcrumbs={[{ name: 'About Us', href: '/about' }]}
      />

      {/* Intro paragraph section */}
      {introSection && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            <div className="space-y-6">
              {introSection.heading && (
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {introSection.heading}
                </h2>
              )}
              {introSection.body?.map((para, idx) => (
                <p key={idx} className="text-lg text-slate-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reused Stats component */}
      <StatsSection stats={stats} />

      {/* Reused ValueProps component */}
      <ValuePropsSection valueProps={valueProps} />

      {/* Team Grid section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {teamHeading}
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              {teamSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex flex-col bg-white overflow-hidden rounded-2xl border border-slate-100 shadow-sm"
              >
                {/* Fallback box for team photos */}
                <div className="relative h-64 w-full bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-semibold italic text-sm p-4 text-center">
                    [Photo: {member.name}]
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      {member.profession}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-600 mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed flex-grow">
                    {member.bio}
                  </p>
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
