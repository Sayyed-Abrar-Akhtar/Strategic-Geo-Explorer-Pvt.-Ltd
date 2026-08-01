import React from 'react';
import type { Metadata } from 'next';
import { getPageContent } from '@/lib/api/pages';
import { getCompanyInfo } from '@/lib/api/company';
import { getLocalBusinessJsonLd } from '@/lib/seo/jsonld';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('contact');
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: '/contact',
    },
  };
}

export default async function ContactPage() {
  const content = await getPageContent('contact');
  const company = await getCompanyInfo();
  const localBusinessSchema = getLocalBusinessJsonLd(company);

  // Extract contact page sections dynamically
  const officeSection = content.sections?.find((s) => s.id === 'office-info');
  const officeHeading = officeSection?.heading || 'Office Headquarters';
  const officeParagraph = officeSection?.body?.[0] || 'Our core operations and analytical team operate from our central offices in Turin, Italy. Reach out directly for consultation slots or to arrange local soil sampling visits.';

  // Fallback map query using company's street and city
  const mapQuery = encodeURIComponent(`${company.address.street}, ${company.address.city}, ${company.address.country}`);
  const mapIframeSrc = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <main className="flex-grow">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <PageHero
        eyebrow={content.hero.eyebrow}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        breadcrumbs={[{ name: 'Contact', href: '/contact' }]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* Left Column: Contact info and map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {officeHeading}
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  {officeParagraph}
                </p>
              </div>

              {/* Information Blocks */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                {/* Address Box */}
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-100 flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-teal-500/10 text-teal-600">
                    <Icon name="map-pin" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Address</h4>
                    <p className="mt-2 text-sm text-slate-600 leading-normal">
                      {company.address.street},<br />
                      {company.address.postalCode} {company.address.city},<br />
                      {company.address.country}
                    </p>
                  </div>
                </div>

                {/* Telephone Box */}
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-100 flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-teal-500/10 text-teal-600">
                    <Icon name="phone" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Phone & Fax</h4>
                    <p className="mt-2 text-sm text-slate-600 space-y-1">
                      <span className="block">Tel: {company.contact.phone}</span>
                      {company.contact.fax && <span className="block">Fax: {company.contact.fax}</span>}
                    </p>
                  </div>
                </div>

                {/* Email Box */}
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-100 flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-teal-500/10 text-teal-600">
                    <Icon name="mail" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Emails</h4>
                    <p className="mt-2 text-sm text-slate-600 leading-normal break-all">
                      <span className="block">{company.contact.email}</span>
                      {company.contact.pec && (
                        <span className="block text-xs text-slate-500 mt-1">PEC: {company.contact.pec}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Social Box */}
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-100 flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-teal-500/10 text-teal-600">
                    <Icon name="globe" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Social Media</h4>
                    <div className="mt-3 flex gap-3">
                      {company.social.linkedin && (
                        <a
                          href={company.social.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-teal-600 transition-colors"
                        >
                          <Icon name="linkedin" className="h-5 w-5" />
                        </a>
                      )}
                      {company.social.facebook && (
                        <a
                          href={company.social.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-teal-600 transition-colors"
                        >
                          <Icon name="facebook" className="h-5 w-5" />
                        </a>
                      )}
                      {company.social.instagram && (
                        <a
                          href={company.social.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-teal-600 transition-colors"
                        >
                          <Icon name="instagram" className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Embed Iframe Map */}
              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 shadow-sm h-72 w-full relative">
                <iframe
                  title="Apex GeoConsulting Office Location"
                  src={mapIframeSrc}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
