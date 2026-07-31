import type { CompanyInfo, Project, CommunityInitiative } from '@/lib/types';

export function getOrganizationJsonLd(company: CompanyInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.legalName,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com'}/brand/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.province,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.contact.phone,
      contactType: 'customer service',
      email: company.contact.email,
    },
    sameAs: Object.values(company.social).filter(Boolean) as string[],
  };
}

export function getLocalBusinessJsonLd(company: CompanyInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: company.name,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com'}/brand/logo.png`,
    telephone: company.contact.phone,
    email: company.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.province,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com',
    priceRange: '$$$',
  };
}

export function getBreadcrumbsJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function getArticleJsonLd(
  item: Project | CommunityInitiative,
  url: string,
  type: 'Project' | 'Community'
) {
  const isProject = type === 'Project';
  const headline = item.title;
  const description = isProject
    ? (item as Project).excerpt
    : (item as CommunityInitiative).description;
  const image = isProject
    ? (item as Project).coverImage
    : (item as CommunityInitiative).image;
  const datePublished = isProject
    ? `${(item as Project).year}-01-01`
    : (item as CommunityInitiative).date;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http')
      ? image
      : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com'}${image}`,
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'Apex GeoConsulting',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apex GeoConsulting',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
