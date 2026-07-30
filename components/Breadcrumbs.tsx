import React from 'react';
import Link from 'next/link';
import { Icon } from './Icon';
import { getBreadcrumbsJsonLd } from '@/lib/seo/jsonld';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark'; // light background = dark text, dark background = light text
}

export function Breadcrumbs({ items, variant = 'light' }: BreadcrumbsProps) {
  // Ensure "Home" is always at the beginning
  const allItems = [
    { name: 'Home', href: '/' },
    ...items.filter((item) => item.href !== '/'),
  ];

  // Construct JSON-LD Structured Data
  const jsonLdItems = allItems.map((item) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com';
    const absoluteUrl = item.href.startsWith('http')
      ? item.href
      : `${siteUrl}${item.href}`;
    return {
      name: item.name,
      item: absoluteUrl,
    };
  });

  const schema = getBreadcrumbsJsonLd(jsonLdItems);

  const textClass = variant === 'dark' ? 'text-slate-300' : 'text-slate-500';
  const activeClass = variant === 'dark' ? 'text-white font-semibold' : 'text-slate-800 font-semibold';
  const hoverClass = variant === 'dark' ? 'hover:text-teal-300' : 'hover:text-teal-600';
  const separatorClass = variant === 'dark' ? 'text-slate-400' : 'text-slate-400';

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Visual Breadcrumb Navigation */}
      <nav className={`flex py-1 text-sm font-medium ${textClass}`} aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {allItems.map((item, idx) => {
            const isLast = idx === allItems.length - 1;
            return (
              <li key={item.href} className="inline-flex items-center">
                {idx > 0 && (
                  <Icon name="chevron-right" className={`mx-1.5 h-3.5 w-3.5 shrink-0 ${separatorClass}`} />
                )}
                {isLast ? (
                  <span className={`truncate max-w-[150px] sm:max-w-xs ${activeClass}`}>
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`transition-all ${hoverClass}`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
