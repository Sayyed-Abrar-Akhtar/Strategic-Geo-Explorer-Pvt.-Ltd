import React from 'react';
import Link from 'next/link';
import { Icon } from './Icon';
import type { CompanyInfo } from '@/lib/types';

interface FooterProps {
  company: CompanyInfo;
}

export function Footer({ company }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-teal-600 text-lg font-bold text-white">
                A
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {company.name}
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md">
              {company.tagline}
            </p>
            <div className="flex space-x-4">
              {company.social.linkedin && (
                <a
                  href={company.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" className="h-5 w-5" />
                </a>
              )}
              {company.social.facebook && (
                <a
                  href={company.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Icon name="facebook" className="h-5 w-5" />
                </a>
              )}
              {company.social.instagram && (
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Icon name="instagram" className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links & Contact Blocks */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Sitemap
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-sm text-slate-400 hover:text-white transition-colors">
                    Community & CSR
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Contact & Legal
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <Icon name="map-pin" className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    {company.address.street},<br />
                    {company.address.postalCode} {company.address.city} ({company.address.province}), {company.address.country}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="phone" className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                  <span>{company.contact.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="mail" className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                  <span>{company.contact.email}</span>
                </li>
                {company.contact.pec && (
                  <li className="flex items-start gap-2">
                    <Icon name="shield-check" className="h-4.5 w-4.5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-xs">PEC: {company.contact.pec}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: legal & privacy info */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div className="space-y-1">
            <p>&copy; {currentYear} {company.legalName}. All rights reserved.</p>
            <p>
              VAT: {company.legal.vatNumber}
              {company.legal.registrationNumber && ` | Reg: ${company.legal.registrationNumber}`}
              {company.legal.shareCapital && ` | Share Capital: ${company.legal.shareCapital}`}
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy & Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
