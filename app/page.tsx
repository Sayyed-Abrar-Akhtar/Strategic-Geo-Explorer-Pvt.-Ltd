import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageContent } from '@/lib/api/pages';
import { getServices } from '@/lib/api/services';
import { getCompanyInfo } from '@/lib/api/company';
import { getValueProps } from '@/lib/api/valueProps';
import { getStats } from '@/lib/api/stats';
import { getTestimonials, getClientLogos } from '@/lib/api/testimonials';
import { ValuePropsSection } from '@/components/ValuePropsSection';
import { StatsSection } from '@/components/StatsSection';
import { CtaBanner } from '@/components/CtaBanner';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('home');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/',
    },
  };
}

export default async function HomePage() {
  const content = await getPageContent('home');
  const company = await getCompanyInfo();
  const services = await getServices();
  const valueProps = await getValueProps();
  const stats = await getStats();
  const testimonials = await getTestimonials();
  const clientLogos = await getClientLogos();

  return (
    <main className="flex-grow">

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400 ring-1 ring-inset ring-teal-400/20 mb-6">
              <Icon name="award" className="h-3.5 w-3.5" />
              Celebrating 20 Years of Survey Precision
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight">
              {content.hero.headline}
            </h1>
            <p className="mt-6 text-xl text-slate-300 leading-relaxed max-w-2xl">
              {content.hero.subheadline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {content.hero.primaryCta && (
                <Link
                  href={content.hero.primaryCta.href}
                  className="rounded-md bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-teal-500 transition-colors text-center"
                >
                  {content.hero.primaryCta.label}
                </Link>
              )}
              {content.hero.secondaryCta && (
                <a
                  href={content.hero.secondaryCta.href}
                  className="rounded-md bg-white/10 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-white/20 backdrop-blur-sm transition-colors text-center border border-white/10"
                >
                  {content.hero.secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
                Core Capabilities
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mt-3">
                Expert Geological & Technical Survey Solutions
              </h2>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 hover:underline"
              >
                View all capabilities
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl bg-slate-50 border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:border-teal-500/15 transition-all duration-300"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="mt-6 border-t border-slate-200/50 pt-4">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 hover:text-teal-700 group-hover:translate-x-1 transition-all"
                  >
                    Explore service
                    <Icon name="arrow-right" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT TEASER */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left side text */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
                Company Teaser
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Combining Earth Sciences with Innovative Structural Engineering
              </h2>
              {company.description.map((p, idx) => (
                <p key={idx} className="text-base text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                >
                  Learn About Our History
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right side box representing an engineering site */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-96 shadow-lg border border-slate-200">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/60 to-teal-950/40 z-10"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                <blockquote className="text-lg font-medium text-slate-100 italic">
                  &ldquo;A thorough understanding of subsurface structures is the only guarantee of durable infrastructure.&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-bold text-teal-400">
                  &mdash; Dr. Alessandro Rossi, Founder
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-slate-700 italic font-semibold text-sm">
                [Soil Drilling & Survey Image Placeholder]
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. VALUE PROPS SECTION */}
      <ValuePropsSection valueProps={valueProps} />

      {/* 5. STATS SECTION */}
      <StatsSection stats={stats} />

      {/* 6. CLIENT LOGOS & TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Testimonial slider / block */}
          {testimonials && testimonials.length > 0 && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
                  Client Endorsements
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl mt-2">
                  What Industry Leaders Say
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="rounded-2xl bg-white border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
                  >
                    <p className="text-base text-slate-600 leading-relaxed italic">
                      &ldquo;{test.quote}&rdquo;
                    </p>
                    <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">{test.clientName}</span>
                      {test.role && (
                        <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                          {test.role}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logo Strip Grid */}
          {clientLogos && clientLogos.length > 0 && (
            <div className="border-t border-slate-200/60 pt-16">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
                Trusted by Lead Public Administrations & Industrial Operators
              </p>
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-center justify-items-center opacity-70">
                {clientLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className="flex h-12 w-full max-w-[120px] items-center justify-center rounded bg-white px-4 border border-slate-100 font-bold text-slate-700 tracking-wider text-sm select-none"
                  >
                    {logo.name}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 8. CTA SECTION */}
      {content.cta && (
        <CtaBanner
          headline={content.cta.headline}
          buttonLabel={content.cta.buttonLabel}
          buttonHref={content.cta.buttonHref}
        />
      )}

      {/* 9. CONTACT FORM SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">
              Inquiries
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-3">
              Request a Technical Consultation
            </h2>
            <p className="mt-4 text-base text-slate-600 max-w-lg mx-auto">
              Our engineers review every query within 24 hours. Submit your study requirements below.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

    </main>
  );
}
