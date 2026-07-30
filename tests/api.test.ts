import { describe, it, expect } from 'vitest';
import { getCompanyInfo } from '@/lib/api/company';
import { getServices, getServiceBySlug } from '@/lib/api/services';
import { getProjects, getProjectBySlug } from '@/lib/api/projects';
import { getTeamMembers } from '@/lib/api/team';
import { getTestimonials, getClientLogos } from '@/lib/api/testimonials';
import { getStats } from '@/lib/api/stats';
import { getCommunityInitiatives } from '@/lib/api/community';
import { getPageContent } from '@/lib/api/pages';
import { getValueProps } from '@/lib/api/valueProps';

describe('Apex GeoConsulting API Abstraction Layer Tests', () => {
  it('should fetch company info successfully', async () => {
    const company = await getCompanyInfo();
    expect(company).toBeDefined();
    expect(company.name).toBe('Apex GeoConsulting');
    expect(company.foundedYear).toBe(2004);
  });

  it('should fetch all services and a specific service by slug', async () => {
    const services = await getServices();
    expect(services).toBeDefined();
    expect(services.length).toBeGreaterThanOrEqual(7);

    const firstService = services[0];
    const serviceBySlug = await getServiceBySlug(firstService.slug);
    expect(serviceBySlug).toBeDefined();
    expect(serviceBySlug?.id).toBe(firstService.id);

    const nonExistent = await getServiceBySlug('non-existent-slug-123');
    expect(nonExistent).toBeUndefined();
  });

  it('should fetch all projects and filter by category or find by slug', async () => {
    const projects = await getProjects();
    expect(projects).toBeDefined();
    expect(projects.length).toBeGreaterThanOrEqual(6);

    const firstProject = projects[0];
    const projectBySlug = await getProjectBySlug(firstProject.slug);
    expect(projectBySlug).toBeDefined();
    expect(projectBySlug?.id).toBe(firstProject.id);

    // Test filtering by category
    const filtered = await getProjects(firstProject.category);
    expect(filtered).toBeDefined();
    expect(filtered.length).toBeGreaterThanOrEqual(1);
    expect(filtered[0].category).toBe(firstProject.category);
  });

  it('should fetch team members sorted by order', async () => {
    const team = await getTeamMembers();
    expect(team).toBeDefined();
    expect(team.length).toBeGreaterThanOrEqual(8);
    // Verify sorting order
    for (let i = 0; i < team.length - 1; i++) {
      expect(team[i].order).toBeLessThanOrEqual(team[i + 1].order);
    }
  });

  it('should fetch testimonials and client logos', async () => {
    const testimonials = await getTestimonials();
    expect(testimonials).toBeDefined();
    expect(testimonials.length).toBeGreaterThanOrEqual(2);

    const logos = await getClientLogos();
    expect(logos).toBeDefined();
    expect(logos.length).toBeGreaterThanOrEqual(4);
  });

  it('should fetch numeric stats', async () => {
    const stats = await getStats();
    expect(stats).toBeDefined();
    expect(stats.length).toBe(4);
    expect(stats.some((s) => s.id === 'years')).toBe(true);
  });

  it('should fetch community initiatives', async () => {
    const initiatives = await getCommunityInitiatives();
    expect(initiatives).toBeDefined();
    expect(initiatives.length).toBeGreaterThanOrEqual(2);
  });

  it('should fetch pages content for home, about, and privacy policy', async () => {
    const homeContent = await getPageContent('home');
    expect(homeContent).toBeDefined();
    expect(homeContent.hero.headline).toBeDefined();

    const aboutContent = await getPageContent('about');
    expect(aboutContent).toBeDefined();
    expect(aboutContent.sections).toBeDefined();

    const privacyContent = await getPageContent('privacy-policy');
    expect(privacyContent).toBeDefined();
    expect(privacyContent.sections?.length).toBeGreaterThanOrEqual(2);

    await expect(getPageContent('invalid-page-key' as any)).rejects.toThrow();
  });

  it('should fetch value propositions successfully', async () => {
    const valueProps = await getValueProps();
    expect(valueProps).toBeDefined();
    expect(valueProps.length).toBe(3);
    expect(valueProps[0].title).toBeDefined();
  });
});
