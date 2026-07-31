import type { MetadataRoute } from 'next';
import { getServices } from '@/lib/api/services';
import { getProjects } from '@/lib/api/projects';
import { getCommunityInitiatives } from '@/lib/api/community';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://apexgeoconsulting.com';

  // Define static routes
  const staticPaths = [
    '',
    '/about',
    '/services',
    '/projects',
    '/community',
    '/contact',
    '/privacy-policy',
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  // Fetch dynamic items
  const services = await getServices();
  const serviceEntries = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projects = await getProjects();
  const projectEntries = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const initiatives = await getCommunityInitiatives();
  const communityEntries = initiatives.map((c) => ({
    url: `${siteUrl}/community/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...serviceEntries, ...projectEntries, ...communityEntries];
}
