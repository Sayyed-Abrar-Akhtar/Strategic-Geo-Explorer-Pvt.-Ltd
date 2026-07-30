import type { Project } from '@/lib/types';
import projectsData from '@/data/projects.json';

export async function getProjects(filterCategory?: string): Promise<Project[]> {
  const projects = projectsData as Project[];
  if (filterCategory && filterCategory !== 'All') {
    return projects.filter((p) => p.category.toLowerCase() === filterCategory.toLowerCase());
  }
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}
