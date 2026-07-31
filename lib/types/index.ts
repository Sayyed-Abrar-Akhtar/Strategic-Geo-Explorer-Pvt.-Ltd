export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string[]; // paragraphs
  foundedYear: number;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    fax?: string;
    email: string;
    pec?: string;
  };
  legal: {
    vatNumber: string;
    registrationNumber?: string;
    shareCapital?: string;
  };
  social: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  brochureUrl?: string;
}

export interface ValueProp {
  id: string;
  icon: string; // icon name/key, resolved to a component
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string; // e.g. "+"
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string[]; // paragraphs or bullet groups
  featuredImage: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  client?: string;
  location?: string;
  year: number;
  excerpt: string;
  description: string[];
  coverImage: string;
  gallery?: string[];
  relatedServiceSlugs?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string; // e.g. "Chairman & Partner"
  profession: string; // e.g. "Geologist"
  bio: string;
  photo: string;
  order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  quote: string;
  role?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

export interface CommunityInitiative {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string; // ISO date
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
  privacyConsent: boolean;
}

export type PageKey =
  | 'home'
  | 'about'
  | 'services'
  | 'projects'
  | 'community'
  | 'contact'
  | 'privacy-policy';

export interface PageContent {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow?: string;        // small label above the headline, e.g. "Services"
    headline: string;
    subheadline?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    image?: string;
  };
  sections?: Array<{
    id: string;
    heading?: string;
    body?: string[];         // paragraphs, used for About intro, Community intro, Privacy Policy body, etc.
  }>;
  cta?: {                     // reusable CTA banner shown near the footer
    headline: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
