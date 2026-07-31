'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
import type { CompanyInfo } from '@/lib/types';

interface HeaderProps {
  company: CompanyInfo;
}

export function Header({ company }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'CSR / Community', href: '/community' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md">
      {/* Top Bar for contact info */}
      <div className="bg-slate-900 px-4 py-1.5 text-xs text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Icon name="phone" className="h-3.5 w-3.5 text-teal-400" />
              {company.contact.phone}
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <Icon name="mail" className="h-3.5 w-3.5 text-teal-400" />
              {company.contact.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {company.social.linkedin && (
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" className="h-3.5 w-3.5" />
              </a>
            )}
            {company.social.facebook && (
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <Icon name="facebook" className="h-3.5 w-3.5" />
              </a>
            )}
            {company.social.instagram && (
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-400 transition-colors"
                aria-label="Instagram"
              >
                <Icon name="instagram" className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-gradient-to-br from-teal-600 to-slate-800 text-lg font-bold text-white">
                A
              </span>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                  {company.name.split(' ')[0]}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-teal-600 font-semibold leading-none mt-0.5">
                  {company.name.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                    isActive ? 'text-teal-600' : 'text-slate-600'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Action */}
          <div className="hidden md:flex md:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? 'x' : 'menu'} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-3 shadow-lg">
          <div className="space-y-1.5">
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-md bg-teal-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
